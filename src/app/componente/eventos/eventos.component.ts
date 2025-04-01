import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';



declare var jQuery:any;
declare var $:any;

interface Evento {
  hora: string; // Ejemplo: "14:00:00"
  fecha_inicio: string; // Fecha del evento
  evento: string; // Nombre del evento
  horaDate?: Date; // Nueva propiedad para la conversión
}


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  public next="assets/image/btn-next-2.webp";
  public time="assets/image/time.webp";

  listarEventos:any;
  hora:any=new Date();

  slideConfig = {
    "dots":"true", "slidesToShow": 5, "slidesToScroll": 1, "infinite": true, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]

  };

  constructor( private conectarApiService:ConectarApiService) { 

  }


  ngOnInit(): void {
    this.conectarApiService.obtenerEventos().subscribe((respuesta: Evento[]) => {
      this.listarEventos = respuesta.map((evento: Evento) => {
        const [hours, minutes, seconds] = evento.hora.split(':');

        // Crear una fecha usando la fecha del evento (si está disponible) o la fecha actual
        let fechaBase = evento.fecha_inicio ? new Date(evento.fecha_inicio) : new Date();

        // Establecer la hora en la fecha base
        fechaBase.setHours(+hours, +minutes, +seconds || 0, 0);

        return { ...evento, horaDate: fechaBase }; // Asignar la nueva fecha/hora
      });
    });
  }
  

}
