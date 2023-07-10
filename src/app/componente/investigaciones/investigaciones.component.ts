import { Component } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-investigaciones',
  templateUrl: './investigaciones.component.html',
  styleUrls: ['./investigaciones.component.css']
})
export class InvestigacionesComponent {

  public logo_pc="assets/image/investigaciones-pc.webp";
  public logo_m="assets/image/investigaciones-m.webp";
  public grupo_investigacion="assets/image/grupo-investigacion.webp";
  public investigacion_reconocimiento="assets/image/investigacion-reconocimiento.webp";
  public img_li="assets/image/img-li.webp";
  public img_li_ok="assets/image/img-li-ok.webp";
  public inves_innova="assets/image/inves-innova.webp";
  public investigacion_requisitos="assets/image/investigacion-requisitos.webp";
  public investigacion_semillero="assets/image/investigacion-semillero.webp";
  public investigacion_actividades="assets/image/investigacion-actividades.webp";
  public investigacion_ganador="assets/image/investigacion-ganador.webp";
  public biodiversidad="assets/image/biodiversidad.webp";
  public innovacion="assets/image/innovacion-social.webp";
  public desarrollo="assets/image/desarrollo.webp";
  public gestion="assets/image/gestion-sostenible.webp";
  public seguridad="assets/image/seguridad.webp";
  public investigacion_eventos="assets/image/investigacion-eventos.webp";
  public investigacion_participacion="assets/image/investigacion-participacion.webp";
  public investigaciones_convocatorias="assets/image/investigaciones-convocatorias.webp";
  public investigaciones_enterate="assets/image/investigaciones-enterate.webp";
  public convocatorias_internas="assets/image/convocatorias-internas.webp";
  public convocatorias_externas="assets/image/convocatorias-externas.webp";
  public internacionalizacion_investigacion="assets/image/internacionalizacion-investigacion.webp";
  public investigaciones_grupo_investigacion="assets/image/investigaciones-grupo-investigacion.webp";
  

  public ciencia_innovacion="assets/image/ciencia-innovacion.webp";
  public next="assets/image/btn-next.webp";
  public prev="assets/image/btn-prev.webp";
  public icono_doc="assets/image/icono-doc.webp";
  public icono_ok="assets/image/icono-ok.webp";
  public icono_calendario="assets/image/icono-calendario.webp";
  public icono_planta="assets/image/icono-planta.webp";


  pagina:any;
  activo:any;

  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;

  total:any;
 
  videoYoutube(valor:any){

    this.total=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + valor); 
    
  }
  
    paginas(pagina:string){

      if(pagina == "0"){
        this.isValid0= true;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,0);

        
      }
  
      if(pagina == "1"){
        this.isValid0= false;
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
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").addClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");

      }
      
      if(pagina == "2"){
        this.isValid0= false;
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
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").addClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");


      }
      
      if(pagina == "3"){
        this.isValid0= false;
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
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").addClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }
      
      if(pagina == "4"){
        this.isValid0= false;
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
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").addClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }
      if(pagina == "5"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= true;
        this.isValid6= false;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").addClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").addClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }
      if(pagina == "6"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= true;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").addClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").addClass("active-m");
      }
  
    }
    constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) { 

    }
  
    ngOnInit(): void {
      this.activo="0";
      this.pagina="1";
      this.paginas(this.pagina);
  
      this.videoYoutube("S9xfJWYE3x8");
    }
  
}
