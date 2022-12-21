import { Component, OnInit, ViewChild } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import {CargarjsService} from 'src/app/servicios/cargarjs.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";

  public prev="assets/image/prev.webp";
  public next="assets/image/next.webp";

  listarNoticias:any;

  slideConfig = {
    "dots":"true","slidesToShow": 3, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  
  };
  
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;
  
  prevImg(){
    this.slickModal.slickPrev();
  }
  nextImg(){
    this.slickModal.slickNext();
  }

  
  constructor(
    private _CargarJsService:CargarjsService,
    private conectarApiService:ConectarApiService,
    
  ) { 

    this._CargarJsService.Cargarjs(["noticias"]);


  }
  
  mostrar(){


      // $('.description').stop().animate({
      //   height: "toggle",
      //   opacity: "toggle"
      // }, 300);

  }
 

  ngOnInit(): void {

    this.conectarApiService.obtenerNoticias().subscribe(respuesta=>{
      this.listarNoticias=respuesta
    });
    this.mostrar();



  }

}
