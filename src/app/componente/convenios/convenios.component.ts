import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css'],
})
export class ConveniosComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sectionId = 'convenios-y-beneficios';
  @Input() pillLabel = 'Convenios y Beneficios';
  @Input() tituloPrincipal = 'Beneficios para la comunidad';
  @Input() tituloDestacado = 'CIAF';
  @Input() descripcion =
    'Accede a descuentos y aliados pensados para tu bienestar. Vincúlate y disfruta lo mejor para tu día a día.';
  @Input() verTodosUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSf5JC_M705BafMwUk2JrGMdQsycwbu6E7ZO10KuHeqdV3IDPQ/viewform?usp=sf_link';
  @Input() verTodosTexto = 'Ver todos los convenios';

  readonly conveniosVisibles = 3;
  readonly conveniosGapPx = 24;
  readonly conveniosAutoplayMs = 5500;

  @ViewChild('conveniosViewport') conveniosViewport?: ElementRef<HTMLElement>;

  listarConvenios: any;

  conveniosIndice = 0;
  conveniosDesplazamiento = 0;
  conveniosAnchoTarjeta = 0;
  conveniosAnimando = true;
  conveniosArrastrando = false;

  private conveniosAutoplayId?: ReturnType<typeof setInterval>;
  private conveniosResizeObserver?: ResizeObserver;
  private conveniosInicioX = 0;
  private conveniosInicioDesplazamiento = 0;

  constructor(
    private conectarApiService: ConectarApiService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerBienestarConvenios().subscribe((respuesta) => {
      this.listarConvenios = respuesta;
      this.reiniciarConveniosCarrusel();
    });
  }

  ngAfterViewInit(): void {
    this.observarViewportConvenios();
  }

  ngOnDestroy(): void {
    this.detenerAutoplayConvenios();
    this.conveniosResizeObserver?.disconnect();
  }

  get usarCarruselConvenios(): boolean {
    return Array.isArray(this.listarConvenios) && this.listarConvenios.length > this.conveniosVisibles;
  }

  get maxIndiceConvenios(): number {
    const total = Array.isArray(this.listarConvenios) ? this.listarConvenios.length : 0;
    return Math.max(0, total - this.conveniosVisibles);
  }

  private observarViewportConvenios(): void {
    this.conveniosResizeObserver?.disconnect();

    if (typeof ResizeObserver === 'undefined' || !this.conveniosViewport?.nativeElement) {
      return;
    }

    this.medirAnchoConvenios();
    this.conveniosResizeObserver = new ResizeObserver(() => this.medirAnchoConvenios());
    this.conveniosResizeObserver.observe(this.conveniosViewport.nativeElement);
  }

  private reiniciarConveniosCarrusel(): void {
    this.conveniosIndice = 0;
    this.actualizarDesplazamientoConvenios(false);
    this.detenerAutoplayConvenios();

    if (this.usarCarruselConvenios) {
      setTimeout(() => {
        this.observarViewportConvenios();
        this.iniciarAutoplayConvenios();
      }, 0);
    }
  }

  private medirAnchoConvenios(): void {
    const anchoViewport = this.conveniosViewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.conveniosGapPx * (this.conveniosVisibles - 1);
    this.conveniosAnchoTarjeta = (anchoViewport - gapsVisibles) / this.conveniosVisibles;
    this.actualizarDesplazamientoConvenios(false);
  }

  private pasoConvenios(): number {
    return this.conveniosAnchoTarjeta + this.conveniosGapPx;
  }

  private actualizarDesplazamientoConvenios(animar: boolean): void {
    this.conveniosAnimando = animar;
    this.conveniosDesplazamiento = -(this.conveniosIndice * this.pasoConvenios());
  }

  private iniciarAutoplayConvenios(): void {
    this.ngZone.runOutsideAngular(() => {
      this.conveniosAutoplayId = setInterval(() => {
        this.ngZone.run(() => this.siguienteConvenio(true));
      }, this.conveniosAutoplayMs);
    });
  }

  private detenerAutoplayConvenios(): void {
    if (this.conveniosAutoplayId) {
      clearInterval(this.conveniosAutoplayId);
      this.conveniosAutoplayId = undefined;
    }
  }

  private reanudarAutoplayConvenios(): void {
    this.detenerAutoplayConvenios();
    if (this.usarCarruselConvenios) {
      this.iniciarAutoplayConvenios();
    }
  }

  private siguienteConvenio(animar = true): void {
    if (!this.usarCarruselConvenios) {
      return;
    }

    this.conveniosIndice = this.conveniosIndice >= this.maxIndiceConvenios ? 0 : this.conveniosIndice + 1;
    this.actualizarDesplazamientoConvenios(animar);
  }

  onConveniosPointerDown(event: PointerEvent): void {
    if (!this.usarCarruselConvenios) {
      return;
    }

    this.detenerAutoplayConvenios();
    this.conveniosArrastrando = true;
    this.conveniosInicioX = event.clientX;
    this.conveniosInicioDesplazamiento = this.conveniosDesplazamiento;
    this.conveniosAnimando = false;
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  onConveniosPointerMove(event: PointerEvent): void {
    if (!this.conveniosArrastrando) {
      return;
    }

    const delta = event.clientX - this.conveniosInicioX;
    let nuevo = this.conveniosInicioDesplazamiento + delta;
    const min = -(this.maxIndiceConvenios * this.pasoConvenios());
    const max = 0;

    this.conveniosDesplazamiento = Math.min(max, Math.max(min, nuevo));
  }

  onConveniosPointerUp(event: PointerEvent): void {
    if (!this.conveniosArrastrando) {
      return;
    }

    this.conveniosArrastrando = false;
    (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);

    const movido = this.conveniosDesplazamiento - this.conveniosInicioDesplazamiento;
    const umbral = this.pasoConvenios() * 0.18;

    if (movido < -umbral && this.conveniosIndice < this.maxIndiceConvenios) {
      this.conveniosIndice += 1;
    } else if (movido > umbral && this.conveniosIndice > 0) {
      this.conveniosIndice -= 1;
    }

    this.actualizarDesplazamientoConvenios(true);
    this.reanudarAutoplayConvenios();
  }

  onConveniosPointerLeave(event: PointerEvent): void {
    if (this.conveniosArrastrando) {
      this.onConveniosPointerUp(event);
    }
  }
}
