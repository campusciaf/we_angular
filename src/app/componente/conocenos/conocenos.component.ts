import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

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
  public ico_pdf="assets/image/icono_pdf.webp";
  public quienes_somos="assets/image/quienes-somos.webp";
  public estrategico="assets/image/estrategico.webp";
  public funcionarios="assets/image/funcionarios.webp";
  public trabaja_nosotros="assets/image/trabaja-nosotros.webp";
  public img_li_ok="assets/image/img-li-ok.webp";
  public colaboradores="assets/image/colaboradores.webp";


  listarCategorias:any;
  listarReglamentos:any;

    reglamentos:Array<any> =[
    {estado:'2',imagen:'assets/image/emprendimientos.webp',titulo:'Derechos Pecuniarios',link:'',modal:"#modalpecuniarios"},
    {estado:'1',imagen:'assets/image/pereira4ri.webp',titulo:'Estatutos Generales',link:"https://ciaf.digital/public/web_normativa/estatutos_actuales.pdf",modal:""},
    {estado:'1',imagen:'assets/image/hub.webp',titulo:'Plan Estratégico',link:"https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf", modal:""},
    {estado:'2',imagen:'assets/image/hub.webp',titulo:'Reglamentos',link:"",modal:"#modalreglamento"},
    {estado:'2',imagen:'assets/image/memorias-institucionales.webp',titulo:'Seguridad Y Salud en el Trabajo',link:"https://publuu.com/flip-book/96771/265548/page/1",modal:"#modalsst"},
    {estado:'1',imagen:'assets/image/hub.webp',titulo:'Protocolo de Violencia Sexual',link:"https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf",modal:""},
  ]

  sstnormativa:Array<any> =[
    {imagen:'assets/image/politica-sst.webp'},
    {imagen:'assets/image/copasst.webp'},
    {imagen:'assets/image/comite-convivencia.webp'},
    {imagen:'assets/image/brigada-emergencia.webp'},
    {imagen:'assets/image/campana-autocuidado.webp'},
    {imagen:'assets/image/galeria-actividades.webp'},

  ]


  slideConfig = {
    "slidesToShow": 6, "slidesToScroll": 1, "dots": true, "infinite": false, "nextArrow":false,"prevArrow":false, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 4
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

  
  pagina:any;
  activo:any;
  valor:any;


  isValid1:boolean = true;
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
  
        $("#btn-1-1").addClass("active-m");
        $("#btn-2-1").removeClass("active-m");
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

    constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) { 

    }

    largo:any;
    uno:number=0;
    
    ngOnInit(): void {
      this.activo="1";
      this.pagina="1";
      this.paginas(this.pagina);

        this.conectarApiService.obtenercategoriasReglamentos().subscribe(respuesta=>{
        this.listarCategorias=respuesta;
      });

        this.conectarApiService.obtenerReglamentos(1).subscribe(resp=>{
        this.listarReglamentos=resp;
        
      });
     
      this.videoYoutube("BMzWQWkUiIA");
      
    }



}
