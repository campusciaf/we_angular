import { Component } from '@angular/core';

export interface AccesoRapido {
  titulo: string;
  subtitulo: string;
  icono: string;
  tonoIcono: 'primary' | 'lime';
  tipoEnlace: 'externo' | 'ruta' | 'modal';
  enlace: string;
}

@Component({
  selector: 'app-accesosrapidos',
  templateUrl: './accesosrapidos.component.html',
  styleUrls: ['./accesosrapidos.component.css']
})
export class AccesosrapidosComponent {

  readonly accesos: AccesoRapido[] = [
    {
      titulo: 'Proyecto Educativo',
      subtitulo: 'PEI institucional CIAF',
      icono: 'fa-book-open',
      tonoIcono: 'primary',
      tipoEnlace: 'externo',
      enlace: 'https://ciaf.digital/public/web_normativa/PEI-CIAF-Educacion-Superior.pdf'
    },
    {
      titulo: 'Calendario Académico',
      subtitulo: 'Fechas clave del semestre',
      icono: 'fa-calendar-check',
      tonoIcono: 'lime',
      tipoEnlace: 'externo',
      enlace: 'https://ciaf.digital/public/web_calendario/calendario_academico.pdf'
    },
    {
      titulo: 'Hoja de Vida',
      subtitulo: 'Postúlate al banco de talento',
      icono: 'fa-id-card',
      tonoIcono: 'primary',
      tipoEnlace: 'modal',
      enlace: '#modalcv'
    },
    {
      titulo: 'Reglamento Estudiantil',
      subtitulo: 'Normativa vigente',
      icono: 'fa-scroll',
      tonoIcono: 'lime',
      tipoEnlace: 'externo',
      enlace: 'https://ciaf.digital/public/web_reglamentos/reglamentoestudiantil.pdf'
    },
    {
      titulo: 'Pagos en Línea',
      subtitulo: 'Recibos y matrículas',
      icono: 'fa-file-invoice-dollar',
      tonoIcono: 'primary',
      tipoEnlace: 'externo',
      enlace: 'https://ciaf.digital/pagos_pse/'
    },
    {
      titulo: 'Egresados',
      subtitulo: 'Comunidad y beneficios',
      icono: 'fa-graduation-cap',
      tonoIcono: 'lime',
      tipoEnlace: 'ruta',
      enlace: '/egresados'
    }
  ];
}
