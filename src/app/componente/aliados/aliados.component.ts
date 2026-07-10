import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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

  readonly gapPx = 16;
  readonly segundosPorTarjeta = 4;

  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;

  listarAliados: Aliado[] = [];
  listarAliadosLoop: Aliado[] = [];

  visibles = 5;
  anchoTarjeta = 168;
  duracionAnimacion = 40;

  private resizeObserver?: ResizeObserver;

  constructor(
    private conectarApiService: ConectarApiService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerAliados().subscribe((respuesta) => {
      this.listarAliados = (respuesta as Aliado[]) || [];
      this.actualizarLoop();
    });
  }

  ngAfterViewInit(): void {
    this.asegurarObserver();
    this.medirAncho();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.asegurarObserver();
    this.medirAncho();
  }

  get usarCarrusel(): boolean {
    return this.listarAliados.length > this.visibles;
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

  trackByIndice(index: number, aliado: Aliado): string {
    return `${index}-${aliado.nombre_aliado}`;
  }

  private actualizarLoop(): void {
    this.listarAliadosLoop = this.listarAliados.length
      ? [...this.listarAliados, ...this.listarAliados]
      : [];

    this.duracionAnimacion = Math.max(
      24,
      this.listarAliados.length * this.segundosPorTarjeta
    );

    setTimeout(() => {
      this.asegurarObserver();
      this.medirAncho();
    }, 0);
  }

  private asegurarObserver(): void {
    const el = this.viewport?.nativeElement;

    if (!el || typeof ResizeObserver === 'undefined') {
      return;
    }

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => this.medirAncho());
      });
    }

    this.resizeObserver.disconnect();
    this.resizeObserver.observe(el);
  }

  private actualizarVisibles(): void {
    const ancho = typeof window !== 'undefined' ? window.innerWidth : 1200;

    if (ancho < 576) {
      this.visibles = 2;
    } else if (ancho < 768) {
      this.visibles = 3;
    } else if (ancho < 992) {
      this.visibles = 4;
    } else {
      this.visibles = 5;
    }
  }

  private medirAncho(): void {
    this.actualizarVisibles();

    const anchoViewport = this.viewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.gapPx * (this.visibles - 1);
    this.anchoTarjeta = (anchoViewport - gapsVisibles) / this.visibles;
  }
}
