import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-contaduria',
  templateUrl: './contaduria.component.html',
  styleUrls: ['./contaduria.component.css']
})
export class ContaduriaComponent implements OnInit {
 
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
  {semestre:1,materia:'Matemática'},
  {semestre:1,materia:'Fundamentos de NIIF origen y marco legal'},
  {semestre:1,materia:'Constitución política y cátedra de paz'},
  {semestre:1,materia:'Administración'},
  {semestre:1,materia:'TIC'},
  {semestre:1,materia:'Lecto escritura'},
  {semestre:1,materia:'Electiva I (Mercadeo, pensamiento empresarial)'},

  {semestre:2,materia:'Estadística descriptiva'},
  {semestre:2,materia:'Contabilidad bajo NIIF I'},
  {semestre:2,materia:'Electiva II  (administración de talento humano, trabajo en equipo)'},
  {semestre:2,materia:'Matemática financiera'},
  {semestre:2,materia:'Estructura de las organizaciones'},
  {semestre:2,materia:'Sistemas de información contable I'},
  {semestre:2,materia:'Teoría del conocimiento'},

  {semestre:3,materia:'Fundamentos de economía'},
  {semestre:3,materia:'Legislación comercial'},
  {semestre:3,materia:'Contabilidad bajo NIIF II'},
  {semestre:3,materia:'Costos y presupuestos'},
  {semestre:3,materia:'Sistemas de información contable II'},
  {semestre:3,materia:'Tributaria I'},
  {semestre:3,materia:'Anteproyecto'},

  {semestre:4,materia:'Legislación laboral'},
  {semestre:4,materia:'Administración financiera'},
  {semestre:4,materia:'Estructuras de productos financieros'},
  {semestre:4,materia:'Contabilidad industrial'},
  {semestre:4,materia:'Tributaria II'},
  {semestre:4,materia:'Opción de grado'},
  {semestre:4,materia:'Auditoría'},

  {semestre:5,materia:'Contabilidades especiales'},
  {semestre:5,materia:'Inglés 5'},
  {semestre:5,materia:'Costos ABC'},
  {semestre:5,materia:'Principios y normatividad contable'},
  {semestre:5,materia:'Creatividad y pensamiento innovador'},
  {semestre:5,materia:'Desarrollo empresarial sostenible'},
  {semestre:5,materia:'Cálculo diferencial'},
  {semestre:5,materia:'Proyecto integrador tecnológico I'},

  {semestre:6,materia:'Administración financiera'},
  {semestre:6,materia:'Procedimiento tributario básico'},
  {semestre:6,materia:'Contabilidad de economía solidaria'},
  {semestre:6,materia:'Inglés 6'},
  {semestre:6,materia:'Estadística inferencial'},
  {semestre:6,materia:'Metodología de la investigación'},
  {semestre:6,materia:'Tecnologías aplicadas'},
  {semestre:6,materia:'Proyecto integrador tecnológico II'},


  {semestre:7,materia:'Seminario de profundización'},
  {semestre:7,materia:'Microeconomía'},
  {semestre:7,materia:'Impuestos complementarios'},
  {semestre:7,materia:'Contabilidad y presupuesto público'},
  {semestre:7,materia:'Software contable y administrativo'},
  {semestre:7,materia:'Proyecto tecnológico'},
  {semestre:7,materia:'Módulo propedéudico'},

  {semestre:8,materia:'Macroeconomía'},
  {semestre:8,materia:'Procedimiento tributario integral'},
  {semestre:8,materia:'Contabilidad avanzada l'},
  {semestre:8,materia:'Inglés 7'},
  {semestre:8,materia:'Normas contables de información financiera'},
  {semestre:8,materia:'Metodología de la investigación aplicada'},
  {semestre:8,materia:'Auditoría basada en riesgos'},
  {semestre:8,materia:'Proyecto integrador profesional'},

  
  {semestre:9,materia:'Conyuntura económica'},
  {semestre:9,materia:'Comercio internacional'},
  {semestre:9,materia:'Contabilidad avanzada II formas societarias'},
  {semestre:9,materia:'Investigación contable'},
  {semestre:9,materia:'Habilidades directivas'},
  {semestre:9,materia:'Auditoría tributaria y de sistemas'},
  {semestre:9,materia:'Mercado de capitales'},

  {semestre:10,materia:'Globalización y negocios internacionales'},
  {semestre:10,materia:'Finanzas corporativas'},
  {semestre:10,materia:'Formulación y evaluación de proyectos'},
  {semestre:10,materia:'Revisoría fiscal'},
  {semestre:10,materia:'Auditoría de gestión'},
  {semestre:10,materia:'Legislación aduanera'},
  {semestre:10,materia:'Ética profesional y de responsabilidad social'},
  {semestre:10,materia:'Trabajo de Grado'},
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
    {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20contaduria%20web', detalle:'',boton:'Escribeme'},
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

    var id:number = 3;

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

