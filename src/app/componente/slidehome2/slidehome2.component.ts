import { Component } from '@angular/core';

@Component({
  selector: 'app-slidehome2',
  templateUrl: './slidehome2.component.html',
  styleUrls: ['./slidehome2.component.css']
})
export class Slidehome2Component {

  activeIndex = 0;
  activeId = 'slide-0';

  particles = Array.from({ length: 22 });

  listarSlider = [
    {
      tipo: 1,
      titulo: 'CIAF Virtual',
      descripcion: 'Una nueva experiencia digital para transformar la educación presencial y virtual.',
      categoria: 'Educación Digital',
      ruta_url: 'https://ciaf.edu.co/inicio',
      img_pc: 'https://amincode.com/tm-html/flex-it/assets/images/hero/hero-bg-1.jpg',
      img_movil: 'URL_IMAGEN_MOVIL_1'
    },
    {
      tipo: 1,
      titulo: 'Gamificación para la permanencia',
      descripcion: 'Insignias, puntos, rankings y rutas de progreso para motivar al estudiante.',
      categoria: 'QUÉDATE',
      ruta_url: 'https://ciaf.edu.co/inicio',
      img_pc: 'https://amincode.com/tm-html/flex-it/assets/images/hero/hero-bg-2.jpg',
      img_movil: 'URL_IMAGEN_MOVIL_2'
    },
    {
      tipo: 1,
      titulo: 'Tecnología que impulsa la institución',
      descripcion: 'Procesos académicos, administrativos y estratégicos integrados en un ecosistema digital.',
      categoria: 'Transformación Digital',
      ruta_url: 'https://ciaf.edu.co/inicio',
      img_pc: 'https://amincode.com/tm-html/flex-it/assets/images/hero/hero-bg-3.jpg',
      img_movil: 'URL_IMAGEN_MOVIL_3'
    }
  ];

  onSlide(event: any): void {
    this.activeId = event.current;

    const index = Number(String(event.current).replace('slide-', ''));

    if (!isNaN(index)) {
      this.activeIndex = index;
    }
  }

  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}