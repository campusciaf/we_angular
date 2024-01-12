import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-adultomayor',
  templateUrl: './adultomayor.component.html',
  styleUrls: ['./adultomayor.component.css']
})
export class AdultomayorComponent {

  public tres_semestres="assets/image/dos-semestres.webp";
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

  ];
  

  
  listarMaterias =[
    {semestre:1,materia:'Atención primaria del adulto mayor'},
    {semestre:1,materia:'Anatomía I'},
    {semestre:1,materia:'Semiología'},
    {semestre:1,materia:'Patología del adulto mayor'},
    {semestre:1,materia:'Dieta y Nutrición del adulto mayor'},
    {semestre:1,materia:'Técnicas de movilización y Funcionalidad del deporte en el adulto mayor'},
    {semestre:1,materia:'Ética y Valores'},
    {semestre:1,materia:'Práctica Geriátrica'},

  
    {semestre:2,materia:'Anatomía II '},
    {semestre:2,materia:'Fisioterapeuta y Función de rehabilitación básica'},
    {semestre:2,materia:'Farmacología'},
    {semestre:2,materia:'Cuidados Oncológicos'},
    {semestre:2,materia:'Práctica Integrada'},


  



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
      {tipo_link:'1',titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20motocicletas%20web', detalle:'',boton:'Escribeme'},
      {tipo_link:'1',titulo:'¿Prefieres llamarme?', pic:this.llamame, link:'tel:+573143400100', detalle:'',boton:'Llamar'},
      {tipo_link:'2',titulo:'¡Date una pasadita por nuestra sede!', pic:this.visita_sede, link:'#direccion', detalle:'Cra. 6 No. 24-56 • Pereira',boton:'Google Maps'},
  
    ];
  
    activarLinkMenu(){
      $("#uno").removeClass("active-link-dropdow");
      $("#dos").addClass("active-link-dropdow");
      
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
  
      var id:number = 10;
  
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
  

