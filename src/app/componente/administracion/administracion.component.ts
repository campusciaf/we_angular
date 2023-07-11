import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {


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

public programas_m="assets/image/programas-m.webp";
public plan_m="assets/image/ico-plan.webp";
public valores_m="assets/image/ico-valores.webp";
public registro_m="assets/image/ico-registro.webp";

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
  {semestre:1,materia:'Matemática aplicada'},
  {semestre:1,materia:'Constitución y cátedra de paz'},
  {semestre:1,materia:'T.I.C'},
  {semestre:1,materia:'Fundamentos de economía'},
  {semestre:1,materia:'Administración'},
  {semestre:1,materia:'Teorías y tendencias mercadeo'},
  {semestre:1,materia:'Lectoescritura'},

  {semestre:2,materia:'Estadística aplicada'},
  {semestre:2,materia:'Legislación comercial'},
  {semestre:2,materia:'Microeconomía'},
  {semestre:2,materia:'Contabilidad aplicada'},
  {semestre:2,materia:'Proceso administrativo'},
  {semestre:2,materia:'Teoría del conocimiento'},
  {semestre:2,materia:'Electiva I'},

  {semestre:3,materia:'Algebra Lineal'},
  {semestre:3,materia:'Macroeconomía'},
  {semestre:3,materia:'Matemática financiera'},
  {semestre:3,materia:'Gestión documental en las organizaciones'},
  {semestre:3,materia:'Comportamiento del consumidor'},
  {semestre:3,materia:'Procesos talento humano'},
  {semestre:3,materia:'Anteproyecto'},

  {semestre:4,materia:'Legislación laboral'},
  {semestre:4,materia:'Procesos productivos'},
  {semestre:4,materia:'Operación de inventarios'},
  {semestre:4,materia:'Teorías de la negociación y servicios a clientes'},
  {semestre:4,materia:'Opción de grado'},
  {semestre:4,materia:'Cultura de la legalidad y la transparencia'},
  {semestre:4,materia:'Electiva II'},
  {semestre:4,materia:'Planeación estratégica'},

  {semestre:5,materia:'Cálculo'},
  {semestre:5,materia:'Estadística inferencial'},
  {semestre:5,materia:'Legislación tributario'},
  {semestre:5,materia:'Hojas de cálculo avanzadas y aplicadas'},
  {semestre:5,materia:'Contabilidad de costos I'},
  {semestre:5,materia:'Estructura y comunicación organizacional'},
  {semestre:5,materia:'Habilidades comunicativas orales'},

  {semestre:6,materia:'Contabilidad de costos II'},
  {semestre:6,materia:'Análisis financiero'},
  {semestre:6,materia:'S.I.G'},
  {semestre:6,materia:'Investigación de mercados'},
  {semestre:6,materia:'Métodos de investigación'},
  {semestre:6,materia:'Responsabilidad social'},

  {semestre:7,materia:'Presupuestos'},
  {semestre:7,materia:'Auditoría administrativa y control interno'},
  {semestre:7,materia:'Distribución de planta'},
  {semestre:7,materia:'Desarrollo y desempeño organizacional'},
  {semestre:7,materia:'Opción de grado tecnológico'},
  {semestre:7,materia:'Electiva III'},
  {semestre:7,materia:'Gerencia estratégica de marketing'},
  {semestre:7,materia:'Logística y D.F.I'},

  {semestre:8,materia:'Investigación de operaciones'},
  {semestre:8,materia:'Geopolítica'},
  {semestre:8,materia:'Cloud computing'},
  {semestre:8,materia:'Prospectiva empresarial'},
  {semestre:8,materia:'Negociación internacional y toma decisiones'},
  {semestre:8,materia:'Comercio electrónico'},
  {semestre:8,materia:'Relaciones públicas'},

  {semestre:9,materia:'Modelo de exportación e importación'},
  {semestre:9,materia:'Gerencia financiera'},
  {semestre:9,materia:'Administración de la producción'},
  {semestre:9,materia:'Formulación y evaluación de proyectos'},
  {semestre:9,materia:'Proyecto de vida'},
  {semestre:9,materia:'Electiva de profundización profesional'},

  {semestre:10,materia:'Derecho comercial internacional'},
  {semestre:10,materia:'Dirección organizacional'},
  {semestre:10,materia:'Simulación gerencial'},
  {semestre:10,materia:'Negocios internacionales'},
  {semestre:10,materia:'Gerencia del talento humano'},
  {semestre:10,materia:'Opción de grado'},
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
    {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20administracion%20web', detalle:'',boton:'Escribeme'},
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

    var id:number = 1;

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

