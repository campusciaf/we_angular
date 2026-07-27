import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-slidehome',
  templateUrl: './slidehome.component.html',
  styleUrls: ['./slidehome.component.css']
})
export class SlidehomeComponent implements OnInit {

  @ViewChild('carousel') carousel?: NgbCarousel;

  listarSlider: any[] = [];
  activeSlide = 0;

  urlBanner = 'https://ciaf.digital/public/web_baner/';

  private swipeActivo = false;
  private swipeInicioX = 0;
  private swipeInicioY = 0;
  private swipeHorizontal = false;
  private readonly swipeUmbralPx = 48;

  constructor(
    private conectarApiService: ConectarApiService,
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerSlide().subscribe({
      next: (respuesta: any) => {
        this.listarSlider = Array.isArray(respuesta) ? respuesta : [];
      },
      error: (error) => {
        console.error('Error cargando slider:', error);
        this.listarSlider = [];
      }
    });
  }

  onSlide(event: NgbSlideEvent): void {
    const id = event.current?.replace('slide-', '');
    this.activeSlide = Number(id || 0);
  }

  pauseSlider(): void {
    this.carousel?.pause();
  }

  resumeSlider(): void {
    this.carousel?.cycle();
  }

  onSwipeStart(event: PointerEvent): void {
    if (event.pointerType === 'mouse' || this.esObjetivoInteractivo(event.target)) {
      return;
    }

    this.swipeActivo = true;
    this.swipeHorizontal = false;
    this.swipeInicioX = event.clientX;
    this.swipeInicioY = event.clientY;
    this.pauseSlider();
  }

  onSwipeMove(event: PointerEvent): void {
    if (!this.swipeActivo) {
      return;
    }

    const dx = event.clientX - this.swipeInicioX;
    const dy = event.clientY - this.swipeInicioY;

    if (!this.swipeHorizontal && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      this.swipeHorizontal = true;
      (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
    }

    if (this.swipeHorizontal) {
      event.preventDefault();
    }
  }

  onSwipeEnd(event: PointerEvent): void {
    if (!this.swipeActivo) {
      return;
    }

    const dx = event.clientX - this.swipeInicioX;
    const fueSwipe = this.swipeHorizontal && Math.abs(dx) >= this.swipeUmbralPx;

    if (fueSwipe) {
      if (dx < 0) {
        this.carousel?.next();
      } else {
        this.carousel?.prev();
      }
    }

    if (this.swipeHorizontal) {
      (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);
    }

    this.swipeActivo = false;
    this.swipeHorizontal = false;
    this.resumeSlider();
  }

  private esObjetivoInteractivo(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    return !!el?.closest('a, button, input, textarea, select, video');
  }

  /**
   * Partes del título para el H1 del hero.
   * Solo el texto dentro de [[...]] lleva degradado (tal cual viene del CMS):
   *   Aquí no solo estudias. [[Te transformas]].
   */
  getTituloPartes(titulo: string): { texto: string; resaltada: boolean }[] {
    if (!titulo) return [];

    const partes: { texto: string; resaltada: boolean }[] = [];
    const marcador = /\[\[([^\]]+)\]\]/g;
    let ultimoIndice = 0;
    let coincidencia: RegExpExecArray | null;

    while ((coincidencia = marcador.exec(titulo)) !== null) {
      const antes = titulo.slice(ultimoIndice, coincidencia.index);
      if (antes) {
        partes.push({ texto: antes, resaltada: false });
      }
      partes.push({ texto: coincidencia[1], resaltada: true });
      ultimoIndice = marcador.lastIndex;
    }

    const resto = titulo.slice(ultimoIndice);
    if (resto) {
      partes.push({ texto: resto, resaltada: false });
    }

    return partes;
  }
}