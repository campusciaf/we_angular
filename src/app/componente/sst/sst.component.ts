import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-sst',
  templateUrl: './sst.component.html',
  styleUrls: ['./sst.component.css']
})
export class SstComponent implements OnInit {
  
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
  ];
  
  listarSemestres3 = [
    {semestre:7},
    {semestre:8},
    {semestre:9},
    {semestre:10},
  
  ];
  
  listarMaterias =[
    {semestre:1,materia:'Matemáticas generales'},
    {semestre:1,materia:'Introdución a la SST'},
    {semestre:1,materia:'TIC I'},
    {semestre:1,materia:'Antecedendes de la legislación en la SST'},
    {semestre:1,materia:'Fundamentos de administración'},
    {semestre:1,materia:'Constitución y cátedra de paz'},
    {semestre:1,materia:'Habilidades de la comunicación'},
  
    {semestre:2,materia:'Estadística'},
    {semestre:2,materia:'TIC II'},
    {semestre:2,materia:'Bioquímica'},
    {semestre:2,materia:'Anatomía y fisiología del trabajo'},
    {semestre:2,materia:'Seguridad social'},
    {semestre:2,materia:'Sistema de gestión de SST - MIPYME I;II;III'},
    {semestre:2,materia:'Teorías del conocimiento'},
  
    {semestre:3,materia:'Métodos de Inspecciones en SST'},
    {semestre:3,materia:'Epidemiología ocupacional'},
    {semestre:3,materia:'Identificación de peligros, evaluación y valoración de los riesgos y medidas de control'},
    {semestre:3,materia:'Prevención y respuesta ante emergencias'},
    {semestre:3,materia:'Legislación en Seguridad y Salud en el Trabajo'},
    {semestre:3,materia:'Gestión de la calidad'},
    {semestre:3,materia:'Metodológia de la Investigación'},

  
    {semestre:4,materia:'Factores de riesgos Locativos y señalización'},
    {semestre:4,materia:'Introdución a los sistemas gestión integrados'},
    {semestre:4,materia:'Modalidad de grado'},
    {semestre:4,materia:'Ética empresarial y profesional'},
    {semestre:4,materia:'Creatividad empresarial'},
    {semestre:4,materia:'Gestión ambiental y Desarrollo sostenible'},
  
    {semestre:5,materia:'Higiene industrial'},
    {semestre:5,materia:'Factores de riesgos biológicos y químicos'},
    {semestre:5,materia:'Investigación de AT-EL'},
    {semestre:5,materia:'Tareas de alto riesgo I'},
    {semestre:5,materia:'Sistema de gestión ambiental'},
    {semestre:5,materia:'Contabilidad aplicada'},
    {semestre:5,materia:'Investigación cuantitativa'},

  
    {semestre:6,materia:'Seguridad industrial'},
    {semestre:6,materia:'Medicina preventiva y del trabajo'},
    {semestre:6,materia:'Legislación en riesgos laborales'},
    {semestre:6,materia:'Sistema de gestión de SST (Riesgo IV y V)'},
    {semestre:6,materia:'Presupuesto'},
    {semestre:6,materia:'Anteproyecto'},
    {semestre:6,materia:'Tareas de alto riesgo II-(Energías peligrosas, materiales peligrosos) '},
  
    {semestre:7,materia:'Factores de riesgos físicos'},
    {semestre:7,materia:'Gestión integral del riesgo de desastres'},
    {semestre:7,materia:'Factores de riesgo biomecánico'},
    {semestre:7,materia:'Plan estratégico de seguridad vial'},
    {semestre:7,materia:'Psicología del trabajo'},
    {semestre:7,materia:'Control total de pérdidas'},
  
    {semestre:8,materia:'Toxicología laboral'},
    {semestre:8,materia:'Derecho laboral aplicado'},
    {semestre:8,materia:'NTC:ISO 45001'},
    {semestre:8,materia:'Auditoría a los sistemas de gestión'},
    {semestre:8,materia:'Técnicas de pedagogía en SST'},
    {semestre:8,materia:'Liderazgo y pensamiento estratégico'},

  
    {semestre:9,materia:'LABORATORIO Respuesta ante emergencias'},
    {semestre:9,materia:'Gestión del talento humano'},
    {semestre:9,materia:'Gerencia estratégica'},
    {semestre:9,materia:'Formulación y evaluación de proyectos'},
    {semestre:9,materia:'Laboratorio de investigación'},
    {semestre:9,materia:'Responsabilidad social - empresarial'},
  
    {semestre:10,materia:'Práctica Organizacional'},

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
      {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20sst%20web', detalle:'',boton:'Escribeme'},
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
  
      var id:number = 5;
  
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
  
  