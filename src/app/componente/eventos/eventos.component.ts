import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

interface Evento {
  hora: string;
  fecha_inicio: string;
  evento: string;
  horaDate?: Date;
  tipo?: string;
  categoria?: string;
  lugar?: string;
  ubicacion?: string;
  descripcion?: string;
  enlace?: string;
  link?: string;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  listarEventos: Evento[] = [];

  slideConfig = {
    dots: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerEventos().subscribe((respuesta: Evento[]) => {
      this.listarEventos = respuesta.map((evento: Evento) => {
        const [hours, minutes, seconds] = evento.hora.split(':');
        const fechaBase = evento.fecha_inicio ? new Date(evento.fecha_inicio) : new Date();

        fechaBase.setHours(+hours, +minutes, +seconds || 0, 0);

        return { ...evento, horaDate: fechaBase };
      });
    });
  }

  getEventTag(evento: Evento): string {
    return evento.tipo || evento.categoria || 'EVENTO';
  }

  getEventLocation(evento: Evento): string {
    return evento.lugar || evento.ubicacion || 'Campus CIAF · Pereira';
  }

  getEventDescription(evento: Evento): string {
    if (evento.descripcion) {
      return evento.descripcion;
    }

    const hora = evento.horaDate
      ? new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true }).format(evento.horaDate)
      : '';

    return hora
      ? `Inicia a las ${hora}. Participa y vive la experiencia CIAF.`
      : 'Participa y vive la experiencia CIAF.';
  }

  getEventLink(evento: Evento): string {
    return evento.enlace || evento.link || '#';
  }
}
