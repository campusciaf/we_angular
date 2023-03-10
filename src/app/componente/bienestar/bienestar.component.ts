import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-bienestar',
  templateUrl: './bienestar.component.html',
  styleUrls: ['./bienestar.component.css']
})
export class BienestarComponent implements OnInit {

  public pic1="assets/image/cultura.webp";
  public pic2="assets/image/desarrollo-humano.webp";
  public pic3="assets/image/salud.webp";
  public pic4="assets/image/promocion.webp";
  public pic5="assets/image/deportes.webp";
  public pic6="assets/image/graduacion.webp";

  imagenesExperiencias:Array<any> =[

    {imagen:this.pic1,titulo:'Cultura'},
    {imagen:this.pic2,titulo:'Desarrollo Humano'},
    {imagen:this.pic3,titulo:'Salud'},
    {imagen:this.pic4,titulo:'Promoción Socioeconómica'},
    {imagen:this.pic5,titulo:'Deportes'},
    {imagen:this.pic6,titulo:'Éxito Estudiantil Meta: Graduación'}

  ]


public bienestar_pc="assets/image/bienestar.webp";
public bienestar_m="assets/image/bienestar-m.webp";
public parche="assets/image/sumate-al-parche.webp";
public quedate="assets/image/quedate.webp";
public inspiradores="assets/image/inspiradores.webp";
public next="assets/image/btn-next.webp";
public prev="assets/image/btn-prev.webp";

public b_salud="assets/image/b_salud.webp";
public b_deportes="assets/image/b_deportes.webp";
public b_cultura="assets/image/b_cultura.webp";
public b_desarrollo="assets/image/b_desarrollo.webp";
public b_promocion="assets/image/b_promocion.webp";
public b_grado="assets/image/b_grado.webp";

public banner_prueba="assets/image/prueba_instagram.webp";

listarInstagram:any;
listarConvenios:any;

slideConfig = {
  "slidesToShow": 4, "slidesToScroll": 1, "dots": true, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
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



prevImg(){
  this.slickModal.slickPrev();
}
nextImg(){
  this.slickModal.slickNext();
}

@ViewChild('slickModalInst')
slickModalInst!: SlickCarouselComponent;

prevImgIns(){
  this.slickModalInst.slickPrev();
}
nextImgIns(){
  this.slickModalInst.slickNext();
}

@ViewChild('slickModalConv')
slickModalConv!: SlickCarouselComponent;

prevImgConv(){
  this.slickModalConv.slickPrev();
}
nextImgConv(){
  this.slickModalConv.slickNext();
}


pagina:any;
activo:any;

  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;
  
    paginas(pagina:string){
      if(pagina == "0"){
        this.isValid0= true;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
      }
  
      if(pagina == "1"){
        this.isValid0= false;
        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
      }
      
      if(pagina == "2"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= true;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
      }
      
      if(pagina == "3"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= true;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
      }
      
      if(pagina == "4"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= true;
        this.isValid5= false;
        this.isValid6= false;
      }
      if(pagina == "5"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= true;
        this.isValid6= false;
      }
      if(pagina == "6"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= true;
      }
  
    }
  

    animarnoticia(id:any){
      $(".accion"+id).css("top","-40px");
    }
    noanimarnoticia(id:any){
      $(".accion"+id).css("top","0px");
    }

    activarLinkMenu(){
      $("#uno").removeClass("active-link-dropdow");
      $("#dos").removeClass("active-link-dropdow");
    }

  constructor(private conectarApiService:ConectarApiService) { 

  }

  ngOnInit(): void {
    this.activo="0";
    this.pagina="0";
    this.paginas(this.pagina);

    this.conectarApiService.obtenerInstagram().subscribe(respuesta=>{
      this.listarInstagram=respuesta.business_discovery.media.data
      console.log(respuesta.business_discovery.media.data);
    });

    this.conectarApiService.obtenerBienestarConvenios().subscribe(respuesta2=>{
      this.listarConvenios=respuesta2

    });

    
    this.activarLinkMenu();
 
  }


  



}
