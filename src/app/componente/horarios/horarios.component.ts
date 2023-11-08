import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';


import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})

export class HorariosComponent {



  public img_logo="assets/image/logo-blanco.webp";

  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1, "infinite": true, "autoplay": true, "rows":6, "autoplaySpeed":6000, "dots": true,
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

  slideConfig2 = {
    "slidesToShow": 1, "slidesToScroll": 1, "infinite": true, "autoplay": true, "autoplaySpeed":9000, "dots": false,
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

  clock:any;
  constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) { }

  listarHorario: any;
  listarHorarioProximo: any;
  expiration_date:any;
 



  id:any;
    ngOnInit(): void {

     

      this.clock = document.getElementById('clock');
      setInterval( () => {
          var date = new Date();
         this.clock.innerText = date.toLocaleTimeString('es-CO', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
      }, 1000);

      this.conectarApiService.obtenerHorario().subscribe(respuesta=>{
        this.listarHorario=respuesta
      }); 

      this.conectarApiService.obtenerHorarioProximo(123).subscribe(respuesta2=>{
        this.listarHorarioProximo=respuesta2
    
      }); 

      function actualizar(){
        location.reload()
      }
       // Función para actualizar cada 4 segundos(4000 milisegundos)
       setInterval(actualizar,300000);



    
    }


    
    test(hora:any):void {

    var dato=moment(hora,'H:m:s').format('hh:mm:ss a')


      $("#horaaa").innerHTML=dato
    
    }

}

