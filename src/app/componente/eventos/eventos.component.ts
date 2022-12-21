import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';



declare var jQuery:any;
declare var $:any;

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

    this.conectarApiService.obtenerEventos().subscribe(respuesta=>{
      this.listarEventos=respuesta
    });

  }

}
