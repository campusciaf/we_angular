import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-investigaciones',
  templateUrl: './investigaciones.component.html',
  styleUrls: ['./investigaciones.component.css']
})
export class InvestigacionesComponent {

  public banner_pc="assets/investigaciones/investigaciones_pc.webp";
  public logo_m="assets/image/investigaciones-m.webp";
  public grupo_investigacion="assets/image/grupo-investigacion.webp";
  public investigacion_reconocimiento="assets/image/investigacion-reconocimiento.webp";
  public img_li="assets/image/img-li.webp";
  public img_li_ok="assets/image/img-li-ok.webp";
  public inves_innova="assets/investigaciones/innovathon.webp";
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


  readonly aliadosConvocatorias = ['MinCiencias', 'RREDSI', 'RUN', 'Alcaldía de Pereira'];

  readonly convocatorias = [
    {
      imagen: 'assets/investigaciones/convocatoria-1.webp',
      mes: 'Marzo 2026',
      titulo: 'Convocatoria Interna de Proyectos de Investigación',
      descripcion:
        'Financiamos proyectos generados en los semilleros e investigaciones de docentes y estudiantes con relevancia para el país, el departamento y la región.',
      enlace: '#',
    },
    {
      imagen: 'assets/investigaciones/convocatoria-2.webp',
      mes: 'Abril 2026',
      titulo: 'Jóvenes Investigadores MinCiencias',
      descripcion:
        'CIAF promueve la participación de docentes y estudiantes en las convocatorias de los organismos nacionales e internacionales.',
      enlace: '#',
    },
    {
      imagen: 'assets/investigaciones/convocatoria-3.webp',
      mes: 'Mayo 2026',
      titulo: 'Reto de Innovación y Transferencia Tecnológica',
      descripcion:
        'Convoca a estudiantes y docentes a presentar soluciones innovadoras con impacto social y desarrollo sostenible.',
      enlace: '#',
    },
  ];

  convocatoriaIndice = 0;

  get convocatoriaActiva() {
    return this.convocatorias[this.convocatoriaIndice];
  }

  convocatoriaAnterior(): void {
    this.convocatoriaIndice =
      this.convocatoriaIndice === 0 ? this.convocatorias.length - 1 : this.convocatoriaIndice - 1;
  }

  convocatoriaSiguiente(): void {
    this.convocatoriaIndice =
      this.convocatoriaIndice === this.convocatorias.length - 1 ? 0 : this.convocatoriaIndice + 1;
  }

  irAConvocatoria(indice: number): void {
    this.convocatoriaIndice = indice;
  }

  readonly boletinSlides = [
    [
      {
        fecha: '17 y 18 de julio · Manizales',
        titulo: 'XI Encuentro Internacional de Pasantías de Investigación Delfín',
        descripcion:
          'Participación con 4 ponencias: 3 internacionales (estudiantes de México) y 1 local (estudiantes CUE).',
      },
      {
        fecha: 'Julio, agosto y septiembre 2025',
        titulo: 'Mesa de Investigaciones RUN y Programa RREDSI',
        descripcion: 'Participación activa de CIAF congeniando proyectos entre las IES de Risaralda.',
      },
      {
        fecha: 'Agosto y septiembre 2025',
        titulo: 'Formación Docentes Investigadores — Curso RUN y Cátedra Itinerante RREDSI',
        descripcion: 'Participación de 8 docentes investigadores en formación en escritura científica.',
      },
    ],
    [
      {
        fecha: '14 de agosto 2025',
        titulo: 'Alineación de metas — Docentes investigadores Escuelas CIAF',
        descripcion:
          'Socialización de planes de trabajo y metas a docentes investigadores periodo 2025-2.',
      },
      {
        fecha: 'Septiembre 2025',
        titulo: 'Recategorización Grupo Organizaciones e Innovación — Categoría C',
        descripcion: 'Recategorización del Grupo en C en la Convocatoria 957 de 2024 de MinCiencias.',
      },
      {
        fecha: '29 de agosto - Pereira',
        titulo: 'Concurso de Innovación E-Riders',
        descripcion:
          'Participación del Semillero de Ingeniería Soluciones con IA en el reto de innovación E-Riders.',
      },
    ],
    [
      {
        fecha: '28 de julio',
        titulo: 'Concurso de Robótica con la Alcaldía de Pereira',
        descripcion:
          'CIAF fortalece la alianza con la Alcaldía de Pereira firmando el convenio del concurso de Robótica.',
      },
      {
        fecha: '28 de agosto',
        titulo: 'Festival Luna de Locos con la IE Boyacá — CRAILAB',
        descripcion:
          'Celebración del festival Luna de Locos en el CRAILAB junto a las instituciones educativas.',
      },
      {
        fecha: '29 de agosto',
        titulo: 'Lanzamiento Biblioteca CIAF — Leer es mi Parche / Programa Z3TA',
        descripcion:
          'Lanzamiento oficial de la Biblioteca CIAF con más de 100 participantes entre estudiantes, docentes y administrativos.',
      },
    ],
  ];

  boletinIndice = 0;

  get boletinSlideActivo() {
    return this.boletinSlides[this.boletinIndice];
  }

  boletinAnterior(): void {
    this.boletinIndice =
      this.boletinIndice === 0 ? this.boletinSlides.length - 1 : this.boletinIndice - 1;
  }

  boletinSiguiente(): void {
    this.boletinIndice =
      this.boletinIndice === this.boletinSlides.length - 1 ? 0 : this.boletinIndice + 1;
  }

  irABoletin(indice: number): void {
    this.boletinIndice = indice;
  }

  pagina:any;
  activo:any;

private scrollSpyIgnorar = false;
private scrollSpyTick = false;
private scrollSpyTimer?: ReturnType<typeof setTimeout>;

campoAccionActivo: string | null = null;

toggleCampoAccion(id: string): void {
  this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
}

  readonly sistemaInvestigacionFrentes = [
    {
      id: 'formativa',
      titulo: 'Investigación Formativa',
      variant: 'primary' as const,
      productos: [
        { label: 'Semilleros', seccion: 'semilleros', nav: '3' },
        { label: 'Auxiliares de investigación' },
        { label: 'Jóvenes investigadores' },
        { label: 'Tesis de grado' },
      ],
    },
    {
      id: 'estricto',
      titulo: 'Investigación en Sentido Estricto',
      variant: 'green' as const,
      productos: [
        { label: 'Grupos de investigación', seccion: 'grupos-de-investigacion', nav: '2' },
        { label: 'Investigadores' },
        { label: 'Proyectos de investigación' },
        { label: 'Convocatorias', seccion: 'convocatorias', nav: '4' },
        { label: 'Artículos, libros y capítulos' },
      ],
    },
    {
      id: 'apropiacion',
      titulo: 'Apropiación y Divulgación del Conocimiento',
      variant: 'lime' as const,
      productos: [
        { label: 'Congresos', seccion: 'eventos', nav: '5' },
        { label: 'Foros', seccion: 'eventos', nav: '5' },
        { label: 'Encuentros', seccion: 'eventos', nav: '5' },
        { label: 'Simposios', seccion: 'eventos', nav: '5' },
        { label: 'Productos ASC ante MinCiencias' },
      ],
    },
  ];

  sistemaInvestigacionActivo: string | null = null;

  toggleSistemaInvestigacion(id: string): void {
    this.sistemaInvestigacionActivo = this.sistemaInvestigacionActivo === id ? null : id;
  }

  isSistemaInvestigacionAbierto(id: string): boolean {
    return this.sistemaInvestigacionActivo === id;
  }

  irAProductoInvestigacion(producto: { seccion?: string; nav?: string }): void {
    if (!producto.seccion || !producto.nav) {
      return;
    }

    this.scrollToSeccion(producto.seccion, producto.nav);
  }

  readonly lideresSemillero = [
    {
      id: 'administracion',
      programa: 'Administración de Empresas',
      semilleros: ['Semillero SiemxSiem', 'Semillero Talento Innova'],
      lider: 'Diego Hernán Jiménez Ocampo',
      email: 'diego.jimenez@ciaf.edu.co',
    },
    {
      id: 'industrial',
      programa: 'Ingeniería Industrial',
      semilleros: ['Semillero Kaizen'],
      lider: 'Jose Hernán Álvarez Martínez',
      email: 'jose.alvarez@ciaf.edu.co',
    },
    {
      id: 'software',
      programa: 'Ingeniería de Software',
      semilleros: ['Semillero SIA'],
      lider: 'Leidy Johana Quintero',
      email: 'leidy.quintero@ciaf.edu.co',
    },
    {
      id: 'contaduria',
      programa: 'Contaduría Pública',
      semilleros: ['Semillero SIUC'],
      lider: 'Jonathan Florez Gallego',
      email: 'jhonathan.florez@ciaf.edu.co',
    },
    {
      id: 'sst',
      programa: 'Seguridad y Salud en el Trabajo',
      semilleros: ['Semillero SISST'],
      lider: 'María Alejandra Galvis',
      email: 'maria.galvis@ciaf.edu.co',
    },
  ];

  semilleroProgramaIndice = 0;

  get semilleroProgramaActivo() {
    return this.lideresSemillero[this.semilleroProgramaIndice];
  }

  seleccionarSemilleroPrograma(indice: number): void {
    this.semilleroProgramaIndice = indice;
  }


  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;


    /** IDs de sección del programa (scroll, no páginas ocultas) */
    readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
      { id: 'investigacion-ciaf', nav: '1', label: 'Investigación CIAF' },
      { id: 'grupos-de-investigacion', nav: '2', label: 'Grupos de investigación' },
      { id: 'semilleros', nav: '3', label: 'Semilleros' },
      { id: 'convocatorias', nav: '4', label: 'Convocatorias' },
      { id: 'eventos', nav: '5', label: 'Eventos' },
      { id: 'internacionalizacion', nav: '6', label: 'Internacionalización' },
      { id: 'normatividad', nav: '7', label: 'Normatividad' },
      { id: 'contacto', nav: '8', label: 'Contacto' },
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
