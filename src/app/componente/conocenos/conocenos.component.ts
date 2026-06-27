import { Component, HostListener, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent {
  public bg_pc="assets/nosotros/nosotros.webp";
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

    reglamentos: Array<any> = [
    { estado: '2', titulo: 'Derechos Pecuniarios', link: '', modal: '#modalpecuniarios', icono: 'fa-solid fa-coins' },
    { estado: '1', titulo: 'Estatutos Generales', link: 'https://ciaf.digital/public/web_normativa/estatutos_actuales.pdf', modal: '', icono: 'fa-solid fa-scale-balanced' },
    { estado: '1', titulo: 'Plan Estratégico', link: 'https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf', modal: '', icono: 'fa-solid fa-clipboard-list' },
    { estado: '2', titulo: 'Reglamentos', link: '', modal: '#modalreglamento', icono: 'fa-regular fa-file-lines' },
    { estado: '2', titulo: 'Seguridad Y Salud en el Trabajo', link: 'https://publuu.com/flip-book/96771/265548/page/1', modal: '#modalsst', icono: 'fa-solid fa-shield-check' },
    { estado: '1', titulo: 'Protocolo de Violencia Sexual', link: 'https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf', modal: '', icono: 'fa-solid fa-shield-exclamation' },
  ]

  readonly equipoInspira: { cargo: string; miembros: { nombre: string; email: string }[] }[] = [
    {
      cargo: 'Presidente Consejo Superior',
      miembros: [{ nombre: 'Gina Marcela Barreto Moreno', email: 'gina.barreto@ciaf.edu.co' }],
    },
    {
      cargo: 'Rectora',
      miembros: [{ nombre: 'Gina Marcela Barreto Moreno', email: 'gina.barreto@ciaf.edu.co' }],
    },
    {
      cargo: 'Secretario General',
      miembros: [{ nombre: 'Jairo Rodríguez Valderrama', email: 'secretariagnral@ciaf.edu.co' }],
    },
    {
      cargo: 'Vicerrector Administrativo y Financiero',
      miembros: [{ nombre: 'Adrián Fernando Ríos Quintero', email: 'adrian.rios@ciaf.edu.co' }],
    },
    {
      cargo: 'Vicerrector de Aprendizaje',
      miembros: [{ nombre: 'Héctor Andrés Bucheli López', email: 'andres.bucheli@ciaf.edu.co' }],
    },
    {
      cargo: 'Director de Ciencia, Tecnología e Innovación',
      miembros: [{ nombre: 'Alejandro Arango Carrea', email: 'alejandro.arango@ciaf.edu.co' }],
    },
    {
      cargo: 'Directora SAC (Sistema de aseguramiento de calidad)',
      miembros: [{ nombre: 'Jhenifer Andrea Pulgarín Moreno', email: 'sac@ciaf.edu.co' }],
    },
    {
      cargo: 'Revisora Fiscal',
      miembros: [{ nombre: 'Andrea Forero', email: 'andrea.forero@ciaf.edu.co' }],
    },
    {
      cargo: 'Director Sistemas de Información',
      miembros: [{ nombre: 'Julián Arlig Jiménez López', email: 'sistemasdeinformacion@ciaf.edu.co' }],
    },
    {
      cargo: 'Director de Creatividad y Comunicaciones',
      miembros: [{ nombre: 'Yoiver Andrey Giraldo Quintero', email: 'yoiver.giraldo@ciaf.edu.co' }],
    },
    {
      cargo: 'Directora de extensión',
      miembros: [{ nombre: 'Leidy Johana López Márquez', email: 'sistemasdeinformacion@ciaf.edu.co' }],
    },
    {
      cargo: 'Coordinadoras Académicas',
      miembros: [
        { nombre: 'Paula Andrea Rengifo Briñez', email: 'paula.rengifo@ciaf.edu.co' },
        { nombre: 'Rosalba Loaiza', email: 'rosa.loaiza@ciaf.edu.co' },
        { nombre: 'Yenny Alejandra Restrepo Uribe', email: 'yenny.restrepo@ciaf.edu.co' },
        { nombre: 'Juan David Machado Mosquera', email: 'juan.machado@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Asistente Académica',
      miembros: [{ nombre: 'Juliana Arenas Ospina', email: 'juliana.arenas@ciaf.edu.co' }],
    },
    {
      cargo: 'Psicólogo',
      miembros: [{ nombre: 'Jhon Alejandro Arévalo Giraldo', email: 'psicologiabienestar@ciaf.edu.co' }],
    },
    {
      cargo: 'Asistente de Bienestar',
      miembros: [{ nombre: 'Stephany Meza Quiceno', email: 'asistentebienestar@ciaf.edu.co' }],
    },
    {
      cargo: 'Auxiliar de Bienestar',
      miembros: [{ nombre: 'Juliana Giraldo Guerra', email: 'aux.bienestar@ciaf.edu.co' }],
    },
    {
      cargo: 'Líder de Comunicaciones',
      miembros: [{ nombre: 'Luisa María Ramírez Tangarife', email: 'comunicaciones@ciaf.edu.co' }],
    },
    {
      cargo: 'Líder Audiovisual',
      miembros: [{ nombre: 'Juan Felipe Montoya García', email: 'juan.montoya@ciaf.edu.co' }],
    },
    {
      cargo: 'Diseñadora Grafica',
      miembros: [{ nombre: 'Isabella Zuluaga Ramírez', email: 'comunicaciones@ciaf.edu.co' }],
    },
    {
      cargo: 'Líder de Riesgo y Cartera',
      miembros: [{ nombre: 'Juan Pablo Lenis Espinal', email: 'juan.lenis@ciaf.edu.co' }],
    },
    {
      cargo: 'Auxiliar de cartera',
      miembros: [
        { nombre: 'Cindy Dahyana Pérez Ríos', email: 'cartera2@ciaf.edu.co' },
        { nombre: 'Elena Cabrera Cardona', email: 'pagos@ciaf.edu.co' },
        { nombre: 'Juliana Mejía García', email: 'pagos@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Contadora',
      miembros: [{ nombre: 'Sandra Milena Bejarano Diaz', email: 'contador2@ciaf.edu.co' }],
    },
    {
      cargo: 'Auxiliar Contable',
      miembros: [{ nombre: 'Luz Piedad Colorado Jaramillo', email: 'auxiliarcontable2@ciaf.edu.co' }],
    },
    {
      cargo: 'Líder de Financiera y de Tesorería',
      miembros: [{ nombre: 'Denys Yaneth Niño Mahecha', email: 'denys.nino@ciaf.edu.co' }],
    },
    {
      cargo: 'Coordinador de Registro y Control',
      miembros: [{ nombre: 'Wilbert René Ramírez Delgado', email: 'registroycontrol@ciaf.edu.co' }],
    },
    {
      cargo: 'Coordinador Técnico de Sistemas',
      miembros: [{ nombre: 'Ferney Benitez', email: 'sistemas@ciaf.edu.co' }],
    },
    {
      cargo: 'Coordinador Sistemas de Información',
      miembros: [{ nombre: 'David González Manrique', email: 'david.gonzalez@ciaf.edu.co' }],
    },
    {
      cargo: 'Auxiliar Sistemas de Información',
      miembros: [{ nombre: 'Jaime Andrés Pérez Londoño', email: 'ja.perez30@ciaf.edu.co' }],
    },
    {
      cargo: 'Asistente de Sistemas de Información',
      miembros: [{ nombre: 'Camila Londoño', email: 'camila.londono@ciaf.edu.co' }],
    },
    {
      cargo: 'Asistente Talento Humano',
      miembros: [{ nombre: 'Olga Yuliet Restrepo Uribe', email: 'asistente.talento@ciaf.edu.co' }],
    },
    {
      cargo: 'Analista Jurídica',
      miembros: [{ nombre: 'Manuela Rendon Miranda', email: 'manuela.rendon@ciaf.edu.co' }],
    },
    {
      cargo: 'Dinamizador',
      miembros: [{ nombre: 'Albeiro Cruz Morales', email: 'albeiro.cruz@ciaf.edu.co' }],
    },
    {
      cargo: 'Auxiliar Educativo',
      miembros: [
        { nombre: 'Carolina Ochoa González', email: 'carolina.ochoa@ciaf.edu.co' },
        { nombre: 'Anyi Dahiana Arias Arenas', email: 'anyi.arias@ciaf.edu.co' },
        { nombre: 'Luisa María Correa Tamayo', email: 'luisa.correa@ciaf.edu.co' },
        { nombre: 'María Camila Vargas Salazar', email: 'camila.vargas@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Servicios Generales',
      miembros: [
        { nombre: 'Blanca Doris Jaramillo Ortiz', email: 'serviciosgenerales@ciaf.edu.co' },
        { nombre: 'Dorise Holguín Mejía', email: 'serviciosgenerales@ciaf.edu.co' },
        { nombre: 'Gladys Ramírez Marín', email: 'serviciosgenerales@ciaf.edu.co' },
        { nombre: 'María Yulie García Ramírez', email: 'serviciosgenerales@ciaf.edu.co' },
        { nombre: 'Patricia Isaza Cardona', email: 'serviciosgenerales@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Auxiliar de Mantenimiento',
      miembros: [
        { nombre: 'Fernando Agudelo Velásquez', email: 'serviciosgenerales@ciaf.edu.co' },
        { nombre: 'Edwin García Murillo', email: 'serviciosgenerales@ciaf.edu.co' },
      ],
    },
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

private scrollSpyIgnorar = false;
private scrollSpyTick = false;
private scrollSpyTimer?: ReturnType<typeof setTimeout>;

campoAccionActivo: string | null = null;

toggleCampoAccion(id: string): void {
  this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
}



  isValid1:boolean = true;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;

      /** IDs de sección del programa (scroll, no páginas ocultas) */
      readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
        { id: 'quienes-somos', nav: '1', label: 'Quienes somos' },
        { id: 'presentacion', nav: '2', label: 'Presentación' },
        { id: 'documentos', nav: '3', label: 'Documentos' },
        { id: 'normatividad', nav: '4', label: 'Normatividad' },
        { id: 'direccionamiento-estrategico', nav: '5', label: 'Direccionamiento Estratégico' },
        { id: 'principios-rectores', nav: '6', label: 'Principios Rectores' },
        { id: 'organigrama', nav: '7', label: 'Organigrama' },
        { id: 'consejo-superior', nav: '8', label: 'Consejo Superior' },
        { id: 'equipo-inspira', nav: '9', label: 'Equipo que Inspira' },
        { id: 'trabaja-nosotros', nav: '10', label: 'Trabaja con Nosotros' },
        { id: 'contacto', nav: '11', label: 'Contacto' },
      ];
            
      scrollToSeccion(sectionId: string, navId?: string): void {
        if (sectionId === 'top') {
          this.scrollSpyIgnorar = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (navId) {
            this.activo = navId;
            this.centrarTabNav(navId);
          }
          this.reanudarScrollSpy(900);
          return;
        }
    
        const el = document.getElementById(sectionId);
        if (!el) {
          return;
        }
    
        const top = el.getBoundingClientRect().top + window.scrollY - this.getNavOffset();
    
        if (navId) {
          this.activo = navId;
          this.centrarTabNav(navId);
        }
    
        this.scrollSpyIgnorar = true;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        this.reanudarScrollSpy(900);
      }
    
      @HostListener('window:scroll')
      onWindowScroll(): void {
        if (this.scrollSpyIgnorar || this.scrollSpyTick) {
          return;
        }
    
        this.scrollSpyTick = true;
        requestAnimationFrame(() => {
          this.actualizarSeccionPorScroll();
          this.scrollSpyTick = false;
        });
      }
    
  
      private actualizarSeccionPorScroll(): void {
        const offset = this.getNavOffset();
        let seccionActual = this.seccionesPrograma[0];
    
        for (const seccion of this.seccionesPrograma) {
          const el = document.getElementById(seccion.id);
    
          if (!el) {
            continue;
          }
    
          if (el.getBoundingClientRect().top - offset <= 8) {
            seccionActual = seccion;
          } else {
            break;
          }
        }
    
        if (this.activo !== seccionActual.nav) {
          this.activo = seccionActual.nav;
          this.centrarTabNav(seccionActual.nav);
        }
      }
  
      private getNavOffset(): number {
        const stickyNav = document.querySelector('.ciaf-program-nav');
        const stickyH = stickyNav?.getBoundingClientRect().height ?? 48;
        return 38 + 78 + stickyH + 12;
      }
  
      private centrarTabNav(navId: string): void {
        document.getElementById('btn-' + navId)?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    
      private reanudarScrollSpy(delayMs: number): void {
        if (this.scrollSpyTimer) {
          clearTimeout(this.scrollSpyTimer);
        }
    
        this.scrollSpyTimer = setTimeout(() => {
          this.scrollSpyIgnorar = false;
          this.actualizarSeccionPorScroll();
        }, delayMs);
      }

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
