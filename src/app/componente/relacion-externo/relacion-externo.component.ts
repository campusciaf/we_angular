import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-relacion-externo',
  templateUrl: './relacion-externo.component.html',
  styleUrls: ['./relacion-externo.component.css']
})
export class RelacionExternoComponent {
  public logo_pc="assets/image/relacion-externa-pc.webp";
  public logo_m="assets/image/relacion-externa-m.webp";
  public la_u_colegio="assets/image/la-u-colegio.webp";
  public mujeres="assets/image/mujeres-transforman.webp";
  public conversatorio="assets/image/conversatorio.webp";

  public diplomado_logistica="assets/image/diplomado-logistica.webp";
  public empresas_amigas_reunion="assets/image/empresas-amigas-reunion.webp";
  
  public next="assets/image/btn-next.webp";
  public prev="assets/image/btn-prev.webp";

  listarCursos:any;
  miCurso:any;
  
  total:any;
 
  videoYoutube(valor:any){

    this.total=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + valor); 
    
  }

  activarLinkMenu(){
    $("#uno").removeClass("active-link-dropdow");
    $("#dos").removeClass("active-link-dropdow");
  }



  slideConfigConvenios = {
    "slidesToShow": 3, "slidesToScroll": 1, "dots": true, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 2
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

  @ViewChild('slickModalConv')
  slickModalConv!: SlickCarouselComponent;
  
  prevImgConv(){
    this.slickModalConv.slickPrev();
  }
  nextImgConv(){
    this.slickModalConv.slickNext();
  }

  constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) {}
    consultar(id:number){
    console.log(id);
   }

  ngOnInit(): void {
    this.conectarApiService.obtenerContinuada().subscribe(respuesta=>{
      this.listarCursos=respuesta
    });
    
    this.activarLinkMenu();

    this.videoYoutube("Zly986I4HIs");
  }
}

