import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-ing-software',
  templateUrl: './ing-software.component.html',
  styleUrls: ['./ing-software.component.css'],
})
export class IngSoftwareComponent implements OnInit {
  public sotfware_pic = 'assets/image/software-pic.webp';
  public img_li = 'assets/image/img-li.webp';
  public next = 'assets/image/btn-next.webp';
  public prev = 'assets/image/btn-prev.webp';
  public descargar = 'assets/image/descargar.webp';
  public desplegar = 'assets/image/desplegar.webp';
  public inscribete_en_linea = 'assets/image/inscribete-en-linea.webp';
  public te_asesoro = 'assets/image/te-asesoro.webp';
  public llamame = 'assets/image/llamame.webp';
  public visita_sede = 'assets/image/visita-sede.webp';

  public banner_financiacion = 'assets/image/banner-financiacion.webp';
  public beneficios = 'assets/image/beneficios.webp';

  listarSemestres1 = [
    { semestre: 1 },
    { semestre: 2 },
    { semestre: 3 },
    { semestre: 4 },
  ];

  listarSemestres2 = [{ semestre: 5 }, { semestre: 6 }, { semestre: 7 }];

  listarSemestres3 = [{ semestre: 8 }, { semestre: 9 }, { semestre: 10 }];

  listarMaterias = [
    // Semestre 1
    { semestre: 1, materia: 'Matemática I' },
    { semestre: 1, materia: 'Lógica de programación' },
    {
      semestre: 1,
      materia: 'Introducción a la informática y herramientas',
    },
    {
      semestre: 1,
      materia: 'Introducción a la ingeniería de software',
    },
    { semestre: 1, materia: 'Proyecto de vida' },
    { semestre: 1, materia: 'Teoría del conocimiento' },

    // Semestre 2
    { semestre: 2, materia: 'Matemática II' },
    { semestre: 2, materia: 'Programación II' },
    { semestre: 2, materia: 'Diseño WEB' },
    { semestre: 2, materia: 'Lectoescritura' },
    { semestre: 2, materia: 'Anteproyecto' },
    {
      semestre: 2,
      materia: 'Pensamiento empresarial o tendencias de emprendimiento',
    },

    // Semestre 3
    { semestre: 3, materia: 'Física I y Laboratorio' },
    { semestre: 3, materia: 'Programación III' },
    { semestre: 3, materia: 'Estructura de datos' },
    {
      semestre: 3,
      materia: 'Herramientas multiplataformas I o redes I',
    },
    {
      semestre: 3,
      materia: 'Plan de negocios o estrategia de negocios',
    },

    // Semestre 4
    { semestre: 4, materia: 'Bases de datos I' },
    { semestre: 4, materia: 'Programación y servicios WEB' },
    { semestre: 4, materia: 'Legislación' },
    { semestre: 4, materia: 'Trabajo de grado' },
    { semestre: 4, materia: 'Álgebra lineal' },
    {
      semestre: 4,
      materia: 'Principios de la ingeniería de software',
    },

    // Semestre 5
    { semestre: 5, materia: 'Cálculo integral' },
    { semestre: 5, materia: 'Estadística descriptiva' },
    { semestre: 5, materia: 'Programación IV' },
    { semestre: 5, materia: 'Ingeniería de software I' },
    {
      semestre: 5,
      materia: 'Calidad del desarrollo de software',
    },
    {
      semestre: 5,
      materia: 'Constitución Política y Cátedra de Paz',
    },

    // Semestre 6
    {
      semestre: 6,
      materia: 'Estadística inferencial y probabilidad',
    },
    { semestre: 6, materia: 'Sistemas operativos' },
    { semestre: 6, materia: 'Programación de redes' },
    {
      semestre: 6,
      materia: 'Herramientas multiplataformas II o redes II',
    },
    { semestre: 6, materia: 'Ética profesional' },
    { semestre: 6, materia: 'Métodos de investigación' },

    // Semestre 7
    { semestre: 7, materia: 'Programación V' },
    { semestre: 7, materia: 'Base de datos II' },
    { semestre: 7, materia: 'Opción de grado tecnológica' },
    {
      semestre: 7,
      materia: 'Fuentes de financiamiento nacional o internacional',
    },
    { semestre: 7, materia: 'Programación lineal' },
    { semestre: 7, materia: 'Cálculo multivariado' },

    // Semestre 8
    { semestre: 8, materia: 'Ecuaciones diferenciales' },
    { semestre: 8, materia: 'Ingeniería de software II' },
    { semestre: 8, materia: 'Bases de datos III' },
    { semestre: 8, materia: 'Auditoría de software' },
    { semestre: 8, materia: 'Inteligencia artificial' },
    {
      semestre: 8,
      materia: 'Economía naranja o desarrollo sostenible',
    },

    // Semestre 9
    { semestre: 9, materia: 'Matemáticas discretas' },
    {
      semestre: 9,
      materia: 'Procesos estocásticos y determinísticos',
    },
    {
      semestre: 9,
      materia: 'Gramáticas y lenguajes formales',
    },
    { semestre: 9, materia: 'Arquitectura cliente/servidor' },
    {
      semestre: 9,
      materia: 'Gestión de proyectos de software',
    },
    { semestre: 9, materia: 'Sistemas expertos' },

    // Semestre 10
    { semestre: 10, materia: 'Cálculo vectorial' },
    { semestre: 10, materia: 'Arquitectura de software' },
    { semestre: 10, materia: 'Compiladores' },
    {
      semestre: 10,
      materia: 'Minería de datos o herramientas de gestión',
    },
    { semestre: 10, materia: 'Seguridad de la información' },
    { semestre: 10, materia: 'Proyecto de grado' },
  ];

  get semestresPlan(): { semestre: number }[] {
    return [
      ...this.listarSemestres1,
      ...this.listarSemestres2,
      ...this.listarSemestres3,
    ];
  }

  materiasDelSemestre(
    semestre: number,
  ): { semestre: number; materia: string }[] {
    return this.listarMaterias.filter((m) => m.semestre === semestre);
  }

  etiquetaTituloSemestre(semestre: number): string | null {
    if (semestre === 4) {
      return 'Técnico Profesional';
    }
    if (semestre === 7) {
      return 'Tecnólogo';
    }
    if (semestre === 10) {
      return 'Profesional Universitario';
    }
    return null;
  }

  esSemestreHito(semestre: number): boolean {
    return semestre === 4 || semestre === 7 || semestre === 10;
  }

  planSemestreAbierto: number | null = null;

  togglePlanSemestre(semestre: number): void {
    this.planSemestreAbierto =
      this.planSemestreAbierto === semestre ? null : semestre;
  }

  planSemestreEstaAbierto(semestre: number): boolean {
    return this.planSemestreAbierto === semestre;
  }

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  pagina: any;
  activo: any;

  private scrollSpyIgnorar = false;
  private scrollSpyTick = false;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;

  isValid1: boolean = true;
  isValid2: boolean = false;
  isValid3: boolean = false;
  isValid4: boolean = false;

  listarPrograma: any;
  listarProgramaVideo: any;
  listarDesempenate: any;
  conocePrograma: any = null;
  perfilProfesional: any[] = [];
  perfilOcupacional: any[] = [];

  /** IDs de sección del programa (scroll, no páginas ocultas) */
  readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
    { id: 'conoce-el-programa', nav: '1', label: 'Conoce el programa' },
    { id: 'campo-de-accion', nav: '2', label: 'Campo de acción' },
    { id: 'experiencias-reales', nav: '3', label: 'Experiencias reales' },
    { id: 'ruta-crecimiento', nav: '4', label: 'Ruta de crecimiento' },
    { id: 'plan-estudios', nav: '5', label: 'Plan de estudios' },
    { id: 'transformacion', nav: '6', label: 'Transformación' },
    { id: 'por-que-estudiarlo', nav: '7', label: '¿Por qué estudiarlo?' },
    { id: 'valores-financiacion', nav: '8', label: 'Valores y financiación' },
    { id: 'proceso-paso-a-paso', nav: '9', label: 'Tu proceso paso a paso' },
    { id: 'descubre-tu-camino', nav: '10', label: 'Descubre tu camino' },
    { id: 'tu-futuro', nav: '11', label: 'Tu futuro' },
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

    const top =
      el.getBoundingClientRect().top + window.scrollY - this.getNavOffset();

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

  ngOnDestroy(): void {
    if (this.scrollSpyTimer) {
      clearTimeout(this.scrollSpyTimer);
    }
  }

  private getNavOffset(): number {
    const stickyNav = document.querySelector('.ciaf-program-nav');
    const stickyH = stickyNav?.getBoundingClientRect().height ?? 48;
    return 38 + 78 + stickyH + 12;
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

  private centrarTabNav(navId: string): void {
    document.getElementById('btn-' + navId)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
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

  paginas(pagina: string): void {
    if (pagina === '0') {
      this.scrollToSeccion('top', '1');
      return;
    }

    const mapa: Record<string, string> = {
      '1': 'conoce-el-programa',
      '2': 'plan-estudios',
      '3': 'valores-financiacion',
      '4': 'proceso-paso-a-paso',
      '5': 'plan-estudios',
      '6': 'transformacion',
      '7': 'por-que-estudiarlo',
      '8': 'valores-financiacion',
      '9': 'proceso-paso-a-paso',
      '10': 'simulador',
      '11': 'tu-futuro',
    };

    const destino = mapa[pagina];
    if (destino) {
      this.scrollToSeccion(destino, pagina);
    }
  }

  listarContacto = [
    {
      tipo_link: '1',
      titulo: '¡Inscríbete en línea!',
      pic: this.inscribete_en_linea,
      link: 'https://ciaf.digital/inscripciones/',
      detalle: '',
      boton: 'Inscipción',
    },
    {
      tipo_link: '1',
      titulo: '¡Escríbeme y te asesoro!',
      pic: this.te_asesoro,
      link: 'https://api.whatsapp.com/send?phone=573143400100&amp;text=Mensaje%20desde%20software%20web',
      detalle: '',
      boton: 'Escribeme',
    },
    {
      tipo_link: '1',
      titulo: '¿Prefieres llamarme?',
      pic: this.llamame,
      link: 'tel:+573143400100',
      detalle: '',
      boton: 'Llamar',
    },
    {
      tipo_link: '2',
      titulo: '¡Date una pasadita por nuestra sede!',
      pic: this.visita_sede,
      link: '#direccion',
      detalle: 'Cra. 6 No. 24-56 • Pereira',
      boton: 'Google Maps',
    },
  ];

  formatearJornadas(jornadasStr?: string): string {
    if (!jornadasStr) return 'Jornada nocturna y fines de semana';
    const clean = jornadasStr.trim();
    if (/^jornada/i.test(clean)) {
      return clean;
    }
    return `Jornada: ${clean}`;
  }

  activarLinkMenu() {
    $('#uno').addClass('active-link-dropdow');
    $('#dos').removeClass('active-link-dropdow');
  }

  total: any;

  videoYoutube(valor: any) {
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + valor,
    );
  }

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.activo = '1';
    this.pagina = '1';
    this.paginas(this.pagina);

    var id: number = 2;

    this.conectarApiService.obtenerProgramaId(id).subscribe({
      next: (respuesta: any) => {
        if (!respuesta?.estado) {
          this.listarPrograma = [];
          this.conocePrograma = null;
          this.perfilProfesional = [];
          this.perfilOcupacional = [];
          return;
        }

        // Lo dejamos como arreglo para conservar su *ngFor actual
        this.listarPrograma = respuesta.programa ? [respuesta.programa] : [];

        this.conocePrograma = respuesta.conoce;
        this.perfilProfesional = respuesta.perfil_profesional || [];
        this.perfilOcupacional = respuesta.perfil_ocupacional || [];

        if (respuesta.programa?.video_descripcion) {
          this.listarProgramaVideo = respuesta.programa.video_descripcion;

          this.videoYoutube(this.listarProgramaVideo);
        }

        console.log(respuesta);
      },
      error: (error) => {
        console.error('Error al cargar el programa:', error);
      },
    });

    this.activarLinkMenu();
  }
}
