import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {


  slideConfig = {
    "slidesToShow": 6, "slidesToScroll": 1, "infinite": true, "autoplay": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  listarAliados: any;

  constructor( private conectarApiService:ConectarApiService) { }

  ngOnInit(): void {
    this.conectarApiService.obtenerAliados().subscribe(respuesta=>{
      this.listarAliados=respuesta;

    });
  }

}
