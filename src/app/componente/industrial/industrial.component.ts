import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.css']
})
export class IndustrialComponent implements OnInit {

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
    {semestre:1,materia:'Lecto Escritura'},
    {semestre:1,materia:'Álgebra, trigonometría y geometría'},
    {semestre:1,materia:'Informática aplicada'},
    {semestre:1,materia:'Introducción a la producción'},
    {semestre:1,materia:'Supply Chain'},
    {semestre:1,materia:'Contabilidad aplicada'},
    {semestre:1,materia:'Administración'},
  
    {semestre:2,materia:'Teoría del conocimiento'},
    {semestre:2,materia:'Matemáticas aplicadas'},
    {semestre:2,materia:'Estadística descriptiva'},
    {semestre:2,materia:'Hojas de cálculo avanzadas y aplicadas '},
    {semestre:2,materia:'Herramientas para el control de producción'},
    {semestre:2,materia:'Gestión de los centros logísticos'},
    {semestre:2,materia:'Costos'},
    {semestre:2,materia:'Fundamentos de seguridad y salud en el trabajo'},
  
    {semestre:3,materia:'Metodología de la investigación'},
    {semestre:3,materia:'Electiva de profundización I'},
    {semestre:3,materia:'Constitución política y cátedra de paz'},
    {semestre:3,materia:'Máquinas y herramientas'},
    {semestre:3,materia:'Logística de compras y aprovisionamiento'},
    {semestre:3,materia:'Control de calidad'},
    {semestre:3,materia:'Presupuestos'},
    {semestre:3,materia:'Mercados'},
  
    {semestre:4,materia:'Seminario de grado'},
    {semestre:4,materia:'Responsabilidad social empresarial'},
    {semestre:4,materia:'Economía'},
    {semestre:4,materia:'Organización y métodos'},
    {semestre:4,materia:'Logística, inventarios y almacén'},
    {semestre:4,materia:'Álgebra lineal'},
    {semestre:4,materia:'Aseguramiento de la calidad'},

  
    {semestre:5,materia:'Gestión ambiental'},
    {semestre:5,materia:'Cálculo diferencial'},
    {semestre:5,materia:'Estadística inferencial'},
    {semestre:5,materia:'Dibujo de ingeniería'},
    {semestre:5,materia:'Planeación y programación de la producción'},
    {semestre:5,materia:'Logística industrial y distribución de planta'},
    {semestre:5,materia:'Costos industriales'},
    {semestre:5,materia:'Proceso de talento humano'},
  
    {semestre:6,materia:'Métodos de investigación'},
    {semestre:6,materia:'Control estadístico de calidad'},
    {semestre:6,materia:'Física I y Lab'},
    {semestre:6,materia:'Logística de distribución nacional e internacional'},
    {semestre:6,materia:'Gestión de la calidad'},
    {semestre:5,materia:'Análisis financiero'},
    {semestre:6,materia:'Investigación de mercados'},
    
  
    {semestre:7,materia:'Opción de grado tecnológica'},
    {semestre:5,materia:'Electiva de profundización II'},
    {semestre:7,materia:'Investigación de operaciones I'},
    {semestre:7,materia:'Microeconomía'},
    {semestre:7,materia:'Sistema integral de gestión'},
    {semestre:7,materia:'Planeación estratégica'},
    {semestre:7,materia:'Legislación laboral'},
    {semestre:7,materia:'Física II y Lab'},

    
    {semestre:8,materia:'Calculo integral'},
    {semestre:8,materia:'Investigación de operaciones II'},
    {semestre:8,materia:'Química y laboratorio'},
    {semestre:8,materia:'Termodinámica'},
    {semestre:8,materia:'Materiales de ingeniería'},
    {semestre:8,materia:'Logística de servicios'},
    {semestre:8,materia:'Ingeniería Económica'},

  
    {semestre:9,materia:'Formulación y gestión de proyectos'},
    {semestre:9,materia:'Comunicación estratégica'},
    {semestre:9,materia:'Procesos Estocásticos'},
    {semestre:9,materia:'Automatización y minería de datos'},
    {semestre:9,materia:'Procesos industriales'},
    {semestre:9,materia:'Logística inversa'},
    {semestre:9,materia:'Gestión del talento humano'},


    {semestre:10,materia:'Opción de grado profesional '},
    {semestre:10,materia:'Electiva profundización III'},
    {semestre:10,materia:'Ética profesional'},
    {semestre:8,materia:'Gerencia de producción'},
    {semestre:8,materia:'Logística estratégica'},
    {semestre:10,materia:'Reingeniería de procesos'},
    {semestre:10,materia:'Estrategias de marketing'},

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
      {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20industrial%20web', detalle:'',boton:'Escribeme'},
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
      this.pagina="0";
      this.paginas(this.pagina);
  
      var id:number = 4;
  
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
  
  