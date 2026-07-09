import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Noticia {
  material: string | number;
  img_noticias: string;
  titulo_noticias: string;
  subtitulo_noticias?: string;
  contenido_noticias: string;
  fecha_noticias: string;
  nombre_categoria: string;
  link_noticia: string;
  url_video?: string;
}

@Component({
  selector: 'app-noticias-home',
  templateUrl: './noticias-home.component.html',
  styleUrls: ['./noticias-home.component.css']
})
export class NoticiasHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly visibles = 3;
  readonly gapPx = 24;
  readonly autoplayMs = 5500;
  readonly transicionMs = 650;

  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;

  listarNoticias: Noticia[] = [];
  totalNoticias = 0;
  titulo: string | undefined;
  total: any;

  indice = 0;
  desplazamiento = 0;
  anchoTarjeta = 0;
  animando = true;

  private autoplayId?: ReturnType<typeof setInterval>;
  private resizeObserver?: ResizeObserver;
  private arrastrando = false;
  private inicioX = 0;
  private inicioDesplazamiento = 0;
  private movioPointer = false;

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerNoticiasPrincipal('codefc').subscribe(respuesta => {
      const principal = (respuesta as Noticia[]) || [];

      if (principal.length) {
        this.listarNoticias = principal;
        this.totalNoticias = principal.length;
        this.reiniciarCarrusel();
        return;
      }

      this.cargarDesdeListadoGeneral();
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
    return this.listarNoticias.length > this.visibles;
  }

  get maxIndice(): number {
    return Math.max(0, this.listarNoticias.length - this.visibles);
  }

  private cargarDesdeListadoGeneral(): void {
    this.conectarApiService.obtenerNoticias().subscribe(respuesta => {
      const todas = (respuesta as Noticia[]) || [];
      this.listarNoticias = todas;
      this.totalNoticias = todas.length;
      this.reiniciarCarrusel();
    });
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

  private esElementoInteractivo(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    return !!el?.closest('a, button, input, textarea, select, label');
  }

  onPointerDown(event: PointerEvent): void {
    if (!this.usarCarrusel || this.esElementoInteractivo(event.target)) {
      return;
    }

    this.detenerAutoplay();
    this.arrastrando = true;
    this.movioPointer = false;
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

    if (Math.abs(delta) > 6) {
      this.movioPointer = true;
    }

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

    if (this.movioPointer) {
      const movido = this.desplazamiento - this.inicioDesplazamiento;
      const umbral = this.paso() * 0.18;

      if (movido < -umbral && this.indice < this.maxIndice) {
        this.indice += 1;
      } else if (movido > umbral && this.indice > 0) {
        this.indice -= 1;
      }
    }

    this.actualizarDesplazamiento(true);
    this.reanudarAutoplay();
  }

  onPointerLeave(event: PointerEvent): void {
    if (this.arrastrando) {
      this.onPointerUp(event);
    }
  }

  esVideo(noticia: Noticia): boolean {
    return String(noticia.material) === '1';
  }

  getNoticiaLink(noticia: Noticia): string {
    return (noticia.link_noticia || '').toString().trim();
  }

  esLinkExterno(noticia: Noticia): boolean {
    const link = this.getNoticiaLink(noticia).toLowerCase();
    return link.startsWith('http://') || link.startsWith('https://');
  }

  irANoticia(event: Event, noticia: Noticia): void {
    event.preventDefault();
    event.stopPropagation();

    const link = this.getNoticiaLink(noticia);

    if (!link) {
      this.router.navigate(['/noticias']);
      return;
    }

    if (this.esLinkExterno(noticia)) {
      window.open(link, '_blank', 'noopener');
      return;
    }

    this.router.navigate(['/noticias', link]);
  }

  getImagenUrl(noticia: Noticia): string {
    const imagen = (noticia.img_noticias || '').trim();

    if (!imagen) {
      return '';
    }

    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }

    return `https://ciaf.digital/public/web_noticias/${imagen}`;
  }

  getExcerpt(noticia: Noticia): string {
    const texto = (noticia.subtitulo_noticias || noticia.contenido_noticias || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!texto) {
      return '';
    }

    return texto.length > 130 ? `${texto.slice(0, 130)}...` : texto;
  }

  videoYoutube(valor: string, titulo: string): void {
    this.titulo = titulo;
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${valor}`);
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}

