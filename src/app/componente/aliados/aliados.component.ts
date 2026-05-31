import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

interface Aliado {
  nombre_aliado: string;
  imagen_aliado: string;
  url_aliado?: string;
}

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly visibles = 5;
  readonly gapPx = 16;
  readonly autoplayMs = 4000;

  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;

  listarAliados: Aliado[] = [];

  indice = 0;
  desplazamiento = 0;
  anchoTarjeta = 168;
  animando = true;

  private autoplayId?: ReturnType<typeof setInterval>;
  private resizeObserver?: ResizeObserver;
  private arrastrando = false;
  private inicioX = 0;
  private inicioDesplazamiento = 0;

  constructor(
    private conectarApiService: ConectarApiService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerAliados().subscribe((respuesta) => {
      this.listarAliados = (respuesta as Aliado[]) || [];
      this.reiniciarCarrusel();
    });
  }

  ngAfterViewInit(): void {
    this.medirAncho();

    if (typeof ResizeObserver !== 'undefined' && this.viewport?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => this.medirAncho());
      this.resizeObserver.observe(this.viewport.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.detenerAutoplay();
    this.resizeObserver?.disconnect();
  }

  get usarCarrusel(): boolean {
    return this.listarAliados.length > this.visibles;
  }

  get maxIndice(): number {
    return Math.max(0, this.listarAliados.length - this.visibles);
  }

  getImagenUrl(aliado: Aliado): string {
    const imagen = (aliado.imagen_aliado || '').trim();

    if (!imagen) {
      return '';
    }

    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }

    return `https://ciaf.digital/public/web_aliados/${imagen}`;
  }

  private reiniciarCarrusel(): void {
    this.indice = 0;
    this.actualizarDesplazamiento(false);
    this.detenerAutoplay();

    if (this.usarCarrusel) {
      setTimeout(() => {
        this.medirAncho();
        this.iniciarAutoplay();
      }, 0);
    }
  }

  private medirAncho(): void {
    const anchoViewport = this.viewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.gapPx * (this.visibles - 1);
    this.anchoTarjeta = (anchoViewport - gapsVisibles) / this.visibles;
    this.actualizarDesplazamiento(false);
  }

  private paso(): number {
    return this.anchoTarjeta + this.gapPx;
  }

  private actualizarDesplazamiento(animar: boolean): void {
    this.animando = animar;
    this.desplazamiento = -(this.indice * this.paso());
  }

  private iniciarAutoplay(): void {
    this.ngZone.runOutsideAngular(() => {
      this.autoplayId = setInterval(() => {
        this.ngZone.run(() => this.siguiente(true));
      }, this.autoplayMs);
    });
  }

  private detenerAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }

  private reanudarAutoplay(): void {
    this.detenerAutoplay();
    if (this.usarCarrusel) {
      this.iniciarAutoplay();
    }
  }

  siguiente(animar = true): void {
    if (!this.usarCarrusel) {
      return;
    }

    this.indice = this.indice >= this.maxIndice ? 0 : this.indice + 1;
    this.actualizarDesplazamiento(animar);
  }

  onPointerDown(event: PointerEvent): void {
    if (!this.usarCarrusel) {
      return;
    }

    this.detenerAutoplay();
    this.arrastrando = true;
    this.inicioX = event.clientX;
    this.inicioDesplazamiento = this.desplazamiento;
    this.animando = false;
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.arrastrando) {
      return;
    }

    const delta = event.clientX - this.inicioX;
    let nuevo = this.inicioDesplazamiento + delta;
    const min = -(this.maxIndice * this.paso());
    const max = 0;

    this.desplazamiento = Math.min(max, Math.max(min, nuevo));
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.arrastrando) {
      return;
    }

    this.arrastrando = false;
    (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);

    const movido = this.desplazamiento - this.inicioDesplazamiento;
    const umbral = this.paso() * 0.18;

    if (movido < -umbral && this.indice < this.maxIndice) {
      this.indice += 1;
    } else if (movido > umbral && this.indice > 0) {
      this.indice -= 1;
    }

    this.actualizarDesplazamiento(true);
    this.reanudarAutoplay();
  }

  onPointerLeave(event: PointerEvent): void {
    if (this.arrastrando) {
      this.onPointerUp(event);
    }
  }
}
