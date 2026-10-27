import { Component, HostListener, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css'],
})
export class ConocenosComponent {
  public bg_pc = 'assets/nosotros/nosotros.webp';
  public bg_m = 'assets/image/conocenos-m.webp';
  public equipo_inspira = 'assets/image/equipo-que-inspira.webp';
  public organigrama = 'assets/image/organigrama.webp';
  public next = 'assets/image/btn-next.webp';
  public prev = 'assets/image/btn-prev.webp';
  public ico_pdf = 'assets/image/icono_pdf.webp';
  public quienes_somos = 'assets/image/quienes-somos.webp';
  public estrategico = 'assets/image/estrategico.webp';
  public funcionarios = 'assets/image/funcionarios.webp';
  public trabaja_nosotros = 'assets/image/trabaja-nosotros.webp';
  public img_li_ok = 'assets/image/img-li-ok.webp';
  public colaboradores = 'assets/image/colaboradores.webp';

  listarCategorias: any;
  listarReglamentos: any;

  reglamentos: Array<any> = [
    {
      estado: '2',
      titulo: 'Derechos Pecuniarios',
      link: '',
      modal: '#modalpecuniarios',
      icono: 'fa-solid fa-coins',
    },
    {
      estado: '1',
      titulo: 'Estatutos Generales',
      link: 'https://ciaf.digital/public/web_normativa/estatutos_actuales.pdf',
      modal: '',
      icono: 'fa-solid fa-scale-balanced',
    },
    {
      estado: '1',
      titulo: 'Plan Estratégico',
      link: 'https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf',
      modal: '',
      icono: 'fa-solid fa-clipboard-list',
    },
    {
      estado: '2',
      titulo: 'Reglamentos',
      link: '',
      modal: '#modalreglamento',
      icono: 'fa-regular fa-file-lines',
    },
    {
      estado: '2',
      titulo: 'Seguridad Y Salud en el Trabajo',
      link: 'https://publuu.com/flip-book/96771/265548/page/1',
      modal: '#modalsst',
      icono: 'fa-solid fa-check',
    },
    {
      estado: '1',
      titulo: 'Protocolo de Violencia Sexual',
      link: 'https://ciaf.digital/public/web_normativa/plan_estrategico_final_preliminar.pdf',
      modal: '',
      icono: 'fa-solid fa-triangle-exclamation',
    },
  ];

  readonly equipoInspira: {
    cargo: string;
    miembros: { nombre: string; email: string }[];
  }[] = [
    {
      cargo: 'Presidente Consejo Superior',
      miembros: [
        {
          nombre: 'Gina Marcela Barreto Moreno',
          email: 'gina.barreto@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Rectora',
      miembros: [
        {
          nombre: 'Gina Marcela Barreto Moreno',
          email: 'gina.barreto@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Secretario General',
      miembros: [
        {
          nombre: 'Jairo Rodríguez Valderrama',
          email: 'secretariagnral@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Revisora Fiscal',
      miembros: [
        { nombre: 'Andrea Forero', email: 'andrea.forero@ciaf.edu.co' },
      ],
    },

    {
      cargo: 'Coordinadora de Calidad',
      miembros: [
        {
          nombre: 'Leira Yuvissa Rojas Acevedo',
          email: 'sac@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Directora de Marca',
      miembros: [
        {
          nombre: 'Yeraldin Aguirre Alvarez',
          email: 'marca@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Directora de Extensión y Mercadeo',
      miembros: [
        {
          nombre: 'Leidy Johana López Márquez',
          email: 'mercadeo@ciaf.edu.co',
        },
      ],
    },
        {
      cargo: 'Directora Financiera',
      miembros: [
        {
          nombre: 'Denys Yaneth Niño Mahecha',
          email: 'denys.nino@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Coordinadores Académicos',
      miembros: [
        {
          nombre: 'JOse Horario Vergara Poveda',
          email: 'area.academica@ciaf.edu.co',
        },
        {
          nombre: 'Andrea Arenas Aristizabal',
          email: 'administracion@ciaf.edu.co',
        },
        {
          nombre: 'Roger Heredia Rodriguez',
          email: 'ingenieria.industrial@ciaf.edu.co',
        },
        {
          nombre: 'Luis Felipe Londoño',
          email: 'ingenieria.software@ciaf.edu.co',
        },
        {
          nombre: 'Esiteyn Franklin Osorio Giraldo',
          email: 'sst@ciaf.edu.co',
        },
      ],
    },
        {
      cargo: 'Lider Articulación y Técnicos Laborales',
      miembros: [
        {
          nombre: 'Juan Diego Osorio Peláez ',
          email: 'articulacion.laborales@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Gestora Académica',
      miembros: [
        {
          nombre: 'Juliana Toro Quiceno',
          email: 'gestor.academicos@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Gestora de Convenios',
      miembros: [
        {
          nombre: 'Laura Vilena Villar',
          email: 'articulacion@ciaf.edu.co',
        },
      ],
    },
        {
      cargo: 'Gestora de Investigación',
      miembros: [
        {
          nombre: 'Danna Sofia Pulgarín Muñoz ',
          email: 'investigacion@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Psicólogo',
      miembros: [
        {
          nombre: 'Shirley Andrea john Perea',
          email: 'psicologia@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Auxiliar de Bienestar',
      miembros: [
        {
          nombre: 'Juliana Arenas Ospina',
          email: 'aux.bienestar@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Líder Comunicaciones',
      miembros: [
        {
          nombre: 'Juan Felipe Montoya García',
          email: 'juan.montoya@ciaf.edu.co',
        },
      ],
    },
        {
      cargo: 'Coordinadora de Comunicaciones',
      miembros: [
        {
          nombre: 'Angie Daniela Valencia Correa ',
          email: 'coordinacion.comunicaciones@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Gestora de Apoyo Institucional y CIAF Virtual',
      miembros: [
        {
          nombre: 'Camila Londoño Quintero',
          email: 'ux.digitals@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Líder de Riesgo y Cartera',
      miembros: [
        { nombre: 'Juan Pablo Lenis Espinal', email: 'juan.lenis@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Auxiliar de cartera',
      miembros: [
        { nombre: 'Elena Cabrera Cardona', email: 'pagos@ciaf.edu.co' },
        { nombre: 'Juliana Mejía García', email: 'pagos@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Auxiliar Financiera',
      miembros: [
        { nombre: 'Jessica Aros Martinez', 
          email: 'aux.financiera@ciaf.edu.co' 
        },
      ],
    },
    {
      cargo: 'Contadora',
      miembros: [
        {
          nombre: 'Sandra Milena Bejarano Diaz',
          email: 'contador2@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Asistente de Contabilidad',
      miembros: [
        {
          nombre: 'Millerlandy Osorio Salgado',
          email: 'auxiliarcontable2@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Coordinador de Registro y Control',
      miembros: [
        {
          nombre: 'Wilbert René Ramírez Delgado',
          email: 'registroycontrol@ciaf.edu.co',
        },
      ],
    },
        {
      cargo: 'Gestora de Registro y Control',
      miembros: [
        {
          nombre: 'Monica Alejandra Vera Nieto ',
          email: 'pacticasregistro@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Coordinador Técnico de Sistemas',
      miembros: [{ nombre: 'Ferney Benitez', email: 'sistemas@ciaf.edu.co' }],
    },

    {
      cargo: 'Lider Talento Humano',
      miembros: [
        {
          nombre: 'Alvarez Iris Yelena',
          email: 'area.administrativa@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Gestora de Talento Humano',
      miembros: [
        {
          nombre: 'Higinio Marín Camila',
          email: 'gestor.talento@ciaf.edu.co',
        },
      ],
    },

    {
      cargo: 'Gestor de Experiencias Universitarias',
      miembros: [
        { nombre: 'Albeiro Cruz Morales', email: 'bienestar@ciaf.edu.co' },
      ],
    },
    {
      cargo: 'Auxiliar Educativo',
      miembros: [
        {
          nombre: 'Luisa María Correa Tamayo',
          email: 'luisa.correa@ciaf.edu.co',
        },
        {
          nombre: 'María Camila Vargas Salazar',
          email: 'camila.vargas@ciaf.edu.co',
        },
      ],
    },
    {
      cargo: 'Servicios Generales',
      miembros: [
        {
          nombre: 'Luz Adriana Prada',
          email: 'serviciosgenerales3@ciaf.edu.co',
        },
        {
          nombre: 'Dorise Holguín Mejía',
          email: 'serviciosgenerales@ciaf.edu.co',
        },
        {
          nombre: 'Gladys Ramírez Marín',
          email: 'serviciosgenerales@ciaf.edu.co',
        },

      ],
    },
    {
      cargo: 'Auxiliar de Mantenimiento',
      miembros: [
        {
          nombre: 'Jose Aldemar Diáz',
          email: 'mantenimiento2@ciaf.edu.co',
        },
        {
          nombre: 'Edwin García Murillo',
          email: 'mantenimiento@ciaf.edu.co',
        },
      ],
    },
  ];

  sstnormativa: Array<any> = [
    { imagen: 'assets/image/politica-sst.webp' },
    { imagen: 'assets/image/copasst.webp' },
    { imagen: 'assets/image/comite-convivencia.webp' },
    { imagen: 'assets/image/brigada-emergencia.webp' },
    { imagen: 'assets/image/campana-autocuidado.webp' },
    { imagen: 'assets/image/galeria-actividades.webp' },
  ];

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  pagina: any;
  activo: any;
  valor: any;

  private scrollSpyIgnorar = false;
  private scrollSpyTick = false;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;

  campoAccionActivo: string | null = null;

  toggleCampoAccion(id: string): void {
    this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
  }

  isValid1: boolean = true;
  isValid2: boolean = false;
  isValid3: boolean = false;
  isValid4: boolean = false;
  isValid5: boolean = false;
  isValid6: boolean = false;

  /** IDs de sección del programa (scroll, no páginas ocultas) */
  readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
    { id: 'quienes-somos', nav: '1', label: 'Quienes somos' },
    { id: 'presentacion', nav: '2', label: 'Presentación' },
    { id: 'documentos', nav: '3', label: 'Documentos' },
    { id: 'normatividad', nav: '4', label: 'Normatividad' },
    {
      id: 'direccionamiento-estrategico',
      nav: '5',
      label: 'Direccionamiento Estratégico',
    },
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

  total: any;

  videoYoutube(valor: any) {
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + valor,
    );
  }

  paginas(pagina: string) {
    if (pagina == '0') {
      window.scroll(0, 0);
    }
    if (pagina == '1') {
      this.isValid1 = true;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = false;
      window.scroll(0, 280);

      $('#btn-1').addClass('active');
      $('#btn-2').removeClass('active');
      $('#btn-3').removeClass('active');
      $('#btn-4').removeClass('active');

      $('#btn-1-1').addClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
    }

    if (pagina == '2') {
      this.isValid1 = false;
      this.isValid2 = true;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = false;
      window.scroll(0, 280);
      $('#btn-1').removeClass('active');
      $('#btn-2').addClass('active');
      $('#btn-3').removeClass('active');
      $('#btn-4').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').addClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
    }

    if (pagina == '3') {
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = true;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = false;
      window.scroll(0, 280);
      $('#btn-1').removeClass('active');
      $('#btn-2').removeClass('active');
      $('#btn-3').addClass('active');
      $('#btn-4').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').addClass('active-m');
      $('#btn-4-1').removeClass('active-m');
    }

    if (pagina == '4') {
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = true;
      this.isValid5 = false;
      this.isValid6 = false;
      window.scroll(0, 280);
      $('#btn-1').removeClass('active');
      $('#btn-2').removeClass('active');
      $('#btn-3').removeClass('active');
      $('#btn-4').addClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').addClass('active-m');
    }
    if (pagina == '5') {
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = true;
      this.isValid6 = false;
      window.scroll(0, 280);
    }
    if (pagina == '6') {
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = true;
      window.scroll(0, 280);
    }
  }

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
  ) {}

  largo: any;
  uno: number = 0;

  ngOnInit(): void {
    this.activo = '1';
    this.pagina = '1';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    this.conectarApiService
      .obtenercategoriasReglamentos()
      .subscribe((respuesta) => {
        this.listarCategorias = respuesta;
      });

    this.conectarApiService.obtenerReglamentos(1).subscribe((resp) => {
      this.listarReglamentos = resp;
    });

    this.videoYoutube('BMzWQWkUiIA');
  }
}
