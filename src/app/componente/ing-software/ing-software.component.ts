import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ing-software',
  templateUrl: './ing-software.component.html',
  styleUrls: ['./ing-software.component.css']
})
export class IngSoftwareComponent implements OnInit {



  public sotfware_pic="assets/image/software-pic.webp";
  public img_li="assets/image/img-li.webp";
  public next="assets/image/btn-next.webp";
  public prev="assets/image/btn-prev.webp";
  public descargar="assets/image/descargar.webp";
  public desplegar="assets/image/desplegar.webp";
  public inscribete_en_linea="assets/image/inscribete-en-linea.webp";
  public te_asesoro="assets/image/te-asesoro.webp";
  public llamame="assets/image/llamame.webp";
  public visita_sede="assets/image/visita-sede.webp";
  
  public banner_financiacion="assets/image/banner-financiacion.webp";
  public beneficios="assets/image/beneficios.webp";
  
  
  listarSemestres1 = [
    {semestre:1},
    {semestre:2},
    {semestre:3},
    {semestre:4},
  ];
  
  listarSemestres2 = [
    {semestre:5},
    {semestre:6},
    {semestre:7},
  ];
  
  listarSemestres3 = [
    {semestre:8},
    {semestre:9},
    {semestre:10},
  
  ];
  
  listarMaterias =[
    {semestre:1,materia:'Matemáticas I'},
    {semestre:1,materia:'Lógica de programación'},
    {semestre:1,materia:'Introducción a la informática y herramientas'},
    {semestre:1,materia:'Introducción a la Ingeniería de Software'},
    {semestre:1,materia:'Proyecto de vida'},
    {semestre:1,materia:'Teoría del conocimiento'},
    
  
    {semestre:2,materia:'Matemáticas II'},
    {semestre:2,materia:'Programación II'},
    {semestre:2,materia:'Diseño WEB'},
    {semestre:2,materia:'Lecto-escritura'},
    {semestre:2,materia:'Anteproyecto'},
    {semestre:2,materia:'Pensamiento empresarial o tendencias de emprendimiento'},
  
    {semestre:3,materia:'Fisica I y lab'},
    {semestre:3,materia:'Programación III'},
    {semestre:3,materia:'Estructura de datos'},
    {semestre:3,materia:'Herramientas multiplataformas I o redes I'},
    {semestre:3,materia:'Plan de negocios o estratégias de negocios'},
    
    {semestre:4,materia:'Bases de datos I'},
    {semestre:4,materia:'Programación y servicios WEB'},
    {semestre:4,materia:'Legislación'},
    {semestre:4,materia:'Trabajo de grado'},
    {semestre:4,materia:'Álgebra lineal'},
    {semestre:4,materia:'Principios de la Ingeniería de Software'},
  
    {semestre:5,materia:'Cálculo integral'},
    {semestre:5,materia:'Estadistica descriptiva'},
    {semestre:5,materia:'Progamación IV'},
    {semestre:5,materia:'Ingeniería de software I'},
    {semestre:5,materia:'Calidad en el desarrollo de software'},
    {semestre:5,materia:'Constitución política y cátedra de paz'},
  
    {semestre:6,materia:'Estadística inferencial y probabilidad'},
    {semestre:6,materia:'Sistemas operativos'},
    {semestre:6,materia:'Programación de redes'},
    {semestre:6,materia:'Herramientas multiplataformas II o redes II'},
    {semestre:6,materia:'Ética profesional'},
    {semestre:6,materia:'Métodos de investigación'},
  
    {semestre:7,materia:'Programación V'},
    {semestre:7,materia:'Base de datos II'},
    {semestre:7,materia:'Opción de grado tecnólogico'},
    {semestre:7,materia:'Fuentes de financiamiento nacional o internacional'},
    {semestre:7,materia:'Programación lineal'},
    {semestre:7,materia:'Cálculo multivariado'},
  
    {semestre:8,materia:'Ecuaciones diferenciales'},
    {semestre:8,materia:'Ingeniería de software II'},
    {semestre:8,materia:'Bases de datos III'},
    {semestre:8,materia:'Auditoría de software'},
    {semestre:8,materia:'Inteligencia artificial'},
    {semestre:8,materia:'Economía naranja o desarrollo sostenible'},
  
    {semestre:9,materia:'Matemáticas discretas'},
    {semestre:9,materia:'Procesos estocásticos y determinísticos'},
    {semestre:9,materia:'Gramáticas y lenguajes formales'},
    {semestre:9,materia:'Arquitectura cliente servidor'},
    {semestre:9,materia:'Gestión de proyectos de software'},
    {semestre:9,materia:'Sistemas expertos'},
  
    {semestre:10,materia:'Cálculo vectorial'},
    {semestre:10,materia:'Arquitectura de software'},
    {semestre:10,materia:'Compiladores'},
    {semestre:10,materia:'Minería de datos o herramientas de gestión'},
    {semestre:10,materia:'Seguridad de la información'},
    {semestre:10,materia:'Proyecto de grado'},
  ];
  
  
  
  slideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
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
  
  pagina:any;
  activo:any;
  
  isValid1:boolean = true;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  
    listarPrograma: any;
    listarProgramaVideo: any;
    listarDesempenate: any;
  
    paginas(pagina:string){
      if(pagina == "0"){
        window.scroll(0,0);
      }
      if(pagina == "1"){
  
        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
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
  
    }
  
    listarContacto =[
      {tipo_link:'1',titulo:'¡Inscríbete en línea!', pic:this.inscribete_en_linea, link:'https://ciaf.digital/inscripciones/', detalle:'',boton:'Inscipción'},
      {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20software%20web', detalle:'',boton:'Escribeme'},
      {tipo_link:'1',titulo:'¿Prefieres llamarme?', pic:this.llamame, link:'tel:+573143400100', detalle:'',boton:'Llamar'},
      {tipo_link:'2',titulo:'¡Date una pasadita por nuestra sede!', pic:this.visita_sede, link:'#direccion', detalle:'Cra. 6 No. 24-56 • Pereira',boton:'Google Maps'},
  
    ];
  
    activarLinkMenu(){
      $("#uno").addClass("active-link-dropdow");
      $("#dos").removeClass("active-link-dropdow");
    }
  
    total:any;
   
    videoYoutube(valor:any){
      this.total=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + valor); 
      
    }
  
  
    constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) { }
  
    ngOnInit(): void {
      this.activo="1";
      this.pagina="1";
      this.paginas(this.pagina);
  
      var id:number = 2;
  
      this.conectarApiService.obtenerProgramaId(id).subscribe(respuesta=>{
        this.listarPrograma=respuesta
      }); 
  
      this.conectarApiService.obtenerProgramaId(id).subscribe(respuesta2=>{
        this.listarProgramaVideo=respuesta2[0]["video_descripcion"];
   
        this.videoYoutube(this.listarProgramaVideo);
      });
  
      this.conectarApiService.obtenerDesempenateId(id).subscribe(respuesta3=>{
        this.listarDesempenate=respuesta3
      }); 
  
      
  
     this.activarLinkMenu();
     
    }
  
  }
  

