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