import { Component } from '@angular/core';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent {
  public bg_pc="assets/image/conocenos-pc.webp";
  public bg_m="assets/image/conocenos-m.webp";
  public equipo_inspira="assets/image/equipo-que-inspira.webp";
  public organigrama="assets/image/organigrama.webp";
  public next="assets/image/btn-next.webp";
  public prev="assets/image/btn-prev.webp";

  reglamentos:Array<any> =[
    {imagen:'assets/image/emprendimientos.webp',titulo:'Nuestro Proyecto Educativo',link:''},
    {imagen:'assets/image/pereira4ri.webp',titulo:'Modelo Pedagógico ',link:"https://pereira4ri.com/"},
    {imagen:'assets/image/hub.webp',titulo:'Plan Etratégico',link:""},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'Rendición de Cuentas',link:"https://publuu.com/flip-book/96771/265548/page/1"},
    {imagen:'assets/image/hub.webp',titulo:'Reglamento Estudiantil',link:""},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'Reglamento Institucional',link:"https://publuu.com/flip-book/96771/265548/page/1"},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'SST',link:"https://publuu.com/flip-book/96771/265548/page/1"},
  ]



  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 1, "dots": true, "infinite": false, "nextArrow":false,"prevArrow":false, "autoplay": true,
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

  
  pagina:any;
  activo:any;



  isValid1:boolean = true;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;
  
    paginas(pagina:string){

      if(pagina == "0"){
        window.scroll(0,0);
      }
      if(pagina == "1"){

        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);

        $("#btn-1").addClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").addClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
      }
      
      if(pagina == "2"){
 
        this.isValid1= false;
        this.isValid2= true;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);
        $("#btn-1").removeClass("active");
        $("#btn-2").addClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").addClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
      }
      
      if(pagina == "3"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= true;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);
        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").addClass("active");
        $("#btn-4").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").addClass("active-m");
        $("#btn-4-1").removeClass("active-m");
      }
      
      if(pagina == "4"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= true;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);
        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").addClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").addClass("active-m");
      }
      if(pagina == "5"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= true;
        this.isValid6= false;
        window.scroll(0,280);
      }
      if(pagina == "6"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= true;
        window.scroll(0,280);
      }
  
    }

    ngOnInit(): void {
      this.activo="1";
      this.pagina="0";
      this.paginas(this.pagina);

    }
  

}
