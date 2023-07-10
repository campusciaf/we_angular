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
        breakpoint: 1048,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 778,
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

  listarAliados: any;

  constructor( private conectarApiService:ConectarApiService) { }

  ngOnInit(): void {
    this.conectarApiService.obtenerAliados().subscribe(respuesta=>{
      this.listarAliados=respuesta;

    });
  }

}
