import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-calidadycrecimiento',
  templateUrl: './calidadycrecimiento.component.html',
  styleUrls: ['./calidadycrecimiento.component.css']
})

export class CalidadycrecimientoComponent implements OnInit {

  public prev="assets/image/btn-prev-3.webp";
  public next="assets/image/btn-next-3.webp";




  slideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 4
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
          slidesToShow: 1
        }
      }
    ]
  
  };
  
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;
  
  listarCalidadCrecimiento: any;

  prevImg(){
    this.slickModal.slickPrev();
  }
  nextImg(){
    this.slickModal.slickNext();
  }


  animarcalidad(id:any){
    $(".e-img-"+id).css("filter","saturate(180%)");
    $(".e-img-"+id).css("transform","scale(1.3)");
  }
  noanimarcalidad(id:any){
    $(".e-img-"+id).css("filter","saturate(0%)");
    $(".e-img-"+id).css("transform","scale(1)");
  }




  constructor(private conectarApiService:ConectarApiService) { }

  ngOnInit(): void {

    this.conectarApiService.obtenerCalidadCrecimiento().subscribe(respuesta=>{
      this.listarCalidadCrecimiento=respuesta;

    });

  }

}
