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



listarInstagram:any;

slideConfig = {
  "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
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


pagina:any;
activo:any;

  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  
    paginas(pagina:string){
      if(pagina == "0"){
        this.isValid0= true;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
      }
  
      if(pagina == "1"){
        this.isValid0= false;
        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
      }
      
      if(pagina == "2"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= true;
        this.isValid3= false;
        this.isValid4= false;
      }
      
      if(pagina == "3"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= true;
        this.isValid4= false;
      }
      
      if(pagina == "4"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= true;
      }
  
    }
  


  constructor(private conectarApiService:ConectarApiService) { 

  }

  ngOnInit(): void {
    this.activo="0";
    this.pagina="1";
    this.paginas(this.pagina);

    this.conectarApiService.obtenerInstagram().subscribe(respuesta=>{
      this.listarInstagram=respuesta.business_discovery.media.data
      console.log(respuesta.business_discovery.media.data);
    });

 
  }


  



}
