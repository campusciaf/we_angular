import { Component, OnInit, HostListener, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-proyeccion-social',
  templateUrl: './proyeccion-social.component.html',
  styleUrls: ['./proyeccion-social.component.css'],
})
export class ProyeccionSocialComponent implements OnInit, AfterViewInit, OnDestroy {
  public bg_pc = 'assets/nosotros/proyeccion-social.webp';


  public focus_group = 'assets/image/focus_group.webp';

  public festival_poesia = 'assets/image/luna_locos.webp';

  public grupo_investigacion = 'assets/image/grupo-investigacion.webp';
  public investigacion_reconocimiento =
    'assets/image/investigacion-reconocimiento.webp';
  public img_li = 'assets/image/img-li.webp';
  public img_li_ok = 'assets/image/img-li-ok.webp';
  public inves_innova = 'assets/investigaciones/innovathon.webp';
  public investigacion_requisitos =
    'assets/image/investigacion-requisitos.webp';
  public investigacion_semillero = 'assets/image/investigacion-semillero.webp';
  public investigacion_actividades =
    'assets/image/investigacion-actividades.webp';
  public investigacion_ganador = 'assets/image/investigacion-ganador.webp';
  public biodiversidad = 'assets/image/biodiversidad.webp';
  public innovacion = 'assets/image/innovacion-social.webp';
  public desarrollo = 'assets/image/desarrollo.webp';
  public gestion = 'assets/image/gestion-sostenible.webp';
  public seguridad = 'assets/image/seguridad.webp';
  public investigacion_eventos = 'assets/image/investigacion-eventos.webp';
  public investigacion_participacion =
    'assets/image/investigacion-participacion.webp';
  public investigaciones_convocatorias =
    'assets/image/investigaciones-convocatorias.webp';
  public investigaciones_enterate =
    'assets/image/investigaciones-enterate.webp';
  public convocatorias_internas = 'assets/image/convocatorias-internas.webp';
  public convocatorias_externas = 'assets/image/convocatorias-externas.webp';

  public investigaciones_grupo_investigacion =
    'assets/image/investigaciones-grupo-investigacion.webp';

  public ciencia_innovacion = 'assets/image/ciencia-innovacion.webp';
  public next = 'assets/image/btn-next.webp';
  public prev = 'assets/image/btn-prev.webp';
  public icono_doc = 'assets/image/icono-doc.webp';
  public icono_ok = 'assets/image/icono-ok.webp';
  public icono_calendario = 'assets/image/icono-calendario.webp';
  public icono_planta = 'assets/image/icono-planta.webp';

  public convenios = [
    {
      titulo: 'Convenio Sumando Sueños',
      url: 'https://www.instagram.com/2030pereira',
      resumen:
        'Alianza entre CIAF y el Movimiento Sociocultural Transformadores On Going para impulsar proyectos educativos, comunitarios y culturales.',
      imagen: 'assets/img/proyeccion/sumando-suenos.jpg',
      abierto: false,
      acciones: [
        'Formación para los miembros del colectivo (cursos, talleres, diplomados).',
        'Beneficios educativos y apoyo a la matrícula.',
        'Visitas académicas y participación en corredores culturales de LaFerro.',
        'Difusión de los proyectos en canales institucionales.',
        'Préstamo de espacios para actividades culturales y comunitarias.'
      ],
      destacados: [
        'Entrega de la estación de banderas y compromiso de donación de $5.000 por estudiante matriculado.',
        'Copatrocinio de la Carrera de los Sueños, aporte de $30.000.000.',
        'Capacitaciones en emergencias y SST para 45 habitantes y gestores culturales.',
        'Caracterización en SST del recorrido cultural para mejorar la seguridad.',
        'Coorganización de La Velada de los Sueños, fortaleciendo alianzas.',
        'Donación del sitio web oficial de LaFerro y $15.000.000 para la estación cultural Fuego de Tambor.',
        'Apoyo logístico para líderes culturales nominados en Titanes Caracol 2024.'
      ],
      fotos: [
        'assets/image/proyeccion/sumando/1.webp',
        'assets/image/proyeccion/sumando/2.webp',
        'assets/image/proyeccion/sumando/3.webp'
      ]
    },
    {
      titulo: 'Convenio Club Activo 2030',
      url: 'https://clubactivo2030.org/',
      resumen:
        'Alianza con organización internacional de jóvenes líderes para impulsar obras sociales con la niñez y comunidades vulnerables.',
      imagen: 'assets/img/proyeccion/club-activo.jpg',
      abierto: false,
      acciones: [
        'Proyectos sociales para la niñez y familias vulnerables.',
        'Actividades comunitarias con impacto educativo.',
        'Participación conjunta en iniciativas culturales y formativas.',
        'Trabajo interinstitucional en pro del bienestar social.'
      ],
      destacados: [
        'Presencia del Club Activo 2030 en 9 ciudades del país.',
        'Más de 146 socios desarrollando proyectos de impacto.',
        'Gestión de hogares infantiles, ludotecas y comedores comunitarios.',
        'Convenio firmado en abril de 2025 para fortalecer la acción social y educativa.'
      ],
      fotos: [
      ]
    }
  ];

  public slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    centerMode: true,
    centerPadding: '60px',
    focusOnSelect: true
  };

  public aliado_proyeccion_social_1 = 'assets/image/aliado_proyeccion_social_1.webp';
  public aliado_proyeccion_social_2 = 'assets/image/aliado_proyeccion_social_2.webp';
  public aliado_proyeccion_social_3 = 'assets/image/aliado_proyeccion_social_3.webp';

  readonly eventosVisibles = 2;
  readonly eventosGapPx = 24;
  readonly eventosAutoplayMs = 5500;

  @ViewChild('eventosViewport') eventosViewport?: ElementRef<HTMLElement>;

  readonly eventosActividades: {
    titulo: string;
    imagen: string;
    parrafos: string[];
    enlace?: { texto: string; url: string };
  }[] = [
    {
      titulo: 'XIX Festival Internacional de Poesía Luna de Locos',
      imagen: 'assets/nosotros/evento-1.webp',
      parrafos: [
        'Entre el 25 y el 30 de agosto de 2025, Pereira fue escenario del XIX Festival Internacional de Poesía Luna de Locos, un encuentro que reunió a más de 25 poetas de países como India, Estados Unidos, Canadá, México, Venezuela, Ecuador, Argentina y España.',
        'El 28 de agosto, CIAF se vinculó apoyando a la IE Boyacá en una jornada que contó con la participación de destacados poetas como Alejandro Simón Partal y Miriam Reyes.',
        'Una experiencia que reafirma nuestro compromiso con la cultura, el arte y la formación integral que inspira a nuestros estudiantes y a la comunidad.',
      ],
      enlace: {
        texto: 'Conoce más sobre el festival aquí',
        url: 'https://www.lunadelocoselfestival.com/',
      },
    },
    {
      titulo: 'Focus Group — Distrito Creativo La Concordia',
      imagen: 'assets/nosotros/evento-2.webp',
      parrafos: [
        'En CIAF creemos en los proyectos que transforman territorios. Por eso reunimos a empresarios, gerentes y líderes públicos de Pereira para escuchar, conectar y construir juntos la visión del Distrito Creativo La Concordia, un espacio llamado a revitalizar el corazón de la ciudad.',
        'Desde las voces de la comunidad y con el liderazgo de nuestras directivas y docentes, identificamos retos, motivaciones y oportunidades que impulsarán un centro más vivo, más creativo y con mayor impacto social.',
        'El encuentro se realizó el 18 de julio de 2024 en el CRAI de CIAF, con una participación que reafirma nuestro propósito: sumar conocimiento para transformar realidades.',
      ],
    },
    {
      titulo: 'Simposio de Seguridad y Salud en el Trabajo',
      imagen: 'assets/nosotros/evento-2.webp',
      parrafos: [
        'El 3 de diciembre de 2023 CIAF llevó a cabo su primer Simposio de Seguridad y Salud en el Trabajo, un espacio académico diseñado para fortalecer la formación de nuestros estudiantes y ampliar su mirada frente a los desafíos reales del sector.',
        'El evento contó con la participación de profesionales en Derecho y PESV, además de la intervención del actor Mauricio Flórez, quien, a través de su puesta en escena "El Culebrero y Margarito", representó de manera creativa y crítica las situaciones más frecuentes en SST dentro de las organizaciones.',
        'Un encuentro que reafirma nuestro compromiso con una formación pertinente, humana y orientada a la transformación del entorno laboral.',
      ],
    },
  ];

  eventosIndice = 0;
  eventosDesplazamiento = 0;
  eventosAnchoTarjeta = 0;
  eventosAnimando = true;
  eventosArrastrando = false;

  private eventosAutoplayId?: ReturnType<typeof setInterval>;
  private eventosResizeObserver?: ResizeObserver;
  private eventosInicioX = 0;
  private eventosInicioDesplazamiento = 0;

  readonly galeriaVisibles = 3;
  readonly galeriaGapPx = 24;
  readonly galeriaAutoplayMs = 5000;

  @ViewChild('galeriaViewport') galeriaViewport?: ElementRef<HTMLElement>;

  readonly galeriaImpacto: { src: string; alt: string }[] = [
    { src: 'assets/nosotros/evento-1.webp', alt: 'Evento CIAF — Festival de Poesía Luna de Locos' },
    { src: 'assets/nosotros/evento-2.webp', alt: 'Evento CIAF — Focus Group La Concordia' },
    { src: 'assets/nosotros/ferro-1.webp', alt: 'Feria del Ferrocarril — LaFerro' },
    { src: 'assets/nosotros/ferro-2.webp', alt: 'Feria del Ferrocarril — LaFerro' },
    { src: 'assets/nosotros/ferro-3.webp', alt: 'Feria del Ferrocarril — LaFerro' },
  ];

  galeriaIndice = 0;
  galeriaDesplazamiento = 0;
  galeriaAnchoItem = 0;
  galeriaAnimando = true;
  galeriaArrastrando = false;

  private galeriaAutoplayId?: ReturnType<typeof setInterval>;
  private galeriaResizeObserver?: ResizeObserver;
  private galeriaInicioX = 0;
  private galeriaInicioDesplazamiento = 0;


  pagina: any;
  activo: any;

  private scrollSpyIgnorar = false;
  private scrollSpyTick = false;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;

  campoAccionActivo: string | null = null;

  toggleCampoAccion(id: string): void {
    this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
  }

  isValid0: boolean = false;
  isValid1: boolean = false;
  isValid2: boolean = false;
  isValid3: boolean = false;
  isValid4: boolean = false;
  isValid5: boolean = false;
  isValid6: boolean = false;

        /** IDs de sección del programa (scroll, no páginas ocultas) */
        readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
          { id: 'presentacion', nav: '1', label: 'Presentación' },
          { id: 'convenios', nav: '2', label: 'Convenios' },
          { id: 'normatividad', nav: '3', label: 'Normatividad' },
          { id: 'eventos-y-actividades', nav: '4', label: 'Eventos y Actividades' },
          { id: 'galeria', nav: '5', label: 'Galería' },
          { id: 'aliados', nav: '6', label: 'Aliados Estratégicos' },
          { id: 'eventos', nav: '7', label: 'Eventos' },
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

  total: any;

  videoYoutube(valor: any) {
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + valor
    );
  }

  paginas(pagina: string) {
    if (pagina == '0') {
      this.isValid0 = true;
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = false;
      window.scroll(0, 0);
    }

    if (pagina == '1') {
      this.isValid0 = false;
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
      $('#btn-5').removeClass('active');
      $('#btn-6').removeClass('active');

      $('#btn-1-1').addClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
      $('#btn-5-1').removeClass('active-m');
      $('#btn-6-1').removeClass('active-m');
    }

    if (pagina == '2') {
      this.isValid0 = false;
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
      $('#btn-5').removeClass('active');
      $('#btn-6').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').addClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
      $('#btn-5-1').removeClass('active-m');
      $('#btn-6-1').removeClass('active-m');
    }

    if (pagina == '3') {
      this.isValid0 = false;
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
      $('#btn-5').removeClass('active');
      $('#btn-6').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').addClass('active-m');
      $('#btn-4-1').removeClass('active-m');
      $('#btn-5-1').removeClass('active-m');
      $('#btn-6-1').removeClass('active-m');
    }

    if (pagina == '4') {
      this.isValid0 = false;
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
      $('#btn-5').removeClass('active');
      $('#btn-6').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').addClass('active-m');
      $('#btn-5-1').removeClass('active-m');
      $('#btn-6-1').removeClass('active-m');
    }
    if (pagina == '5') {
      this.isValid0 = false;
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = true;
      this.isValid6 = false;
      window.scroll(0, 280);

      $('#btn-1').removeClass('active');
      $('#btn-2').removeClass('active');
      $('#btn-3').removeClass('active');
      $('#btn-4').removeClass('active');
      $('#btn-5').addClass('active');
      $('#btn-6').removeClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
      $('#btn-5-1').addClass('active-m');
      $('#btn-6-1').removeClass('active-m');
    }
    if (pagina == '6') {
      this.isValid0 = false;
      this.isValid1 = false;
      this.isValid2 = false;
      this.isValid3 = false;
      this.isValid4 = false;
      this.isValid5 = false;
      this.isValid6 = true;
      window.scroll(0, 280);

      $('#btn-1').removeClass('active');
      $('#btn-2').removeClass('active');
      $('#btn-3').removeClass('active');
      $('#btn-4').removeClass('active');
      $('#btn-5').removeClass('active');
      $('#btn-6').addClass('active');

      $('#btn-1-1').removeClass('active-m');
      $('#btn-2-1').removeClass('active-m');
      $('#btn-3-1').removeClass('active-m');
      $('#btn-4-1').removeClass('active-m');
      $('#btn-5-1').removeClass('active-m');
      $('#btn-6-1').addClass('active-m');
    }
  }
  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.observarViewportEventos();
    this.reiniciarEventosCarrusel();
    this.observarViewportGaleria();
    this.reiniciarGaleriaCarrusel();
  }

  ngOnDestroy(): void {
    this.detenerAutoplayEventos();
    this.eventosResizeObserver?.disconnect();
    this.detenerAutoplayGaleria();
    this.galeriaResizeObserver?.disconnect();
  }

  get usarCarruselEventos(): boolean {
    return this.eventosActividades.length > this.eventosVisibles;
  }

  get maxIndiceEventos(): number {
    return Math.max(0, this.eventosActividades.length - this.eventosVisibles);
  }

  private observarViewportEventos(): void {
    this.eventosResizeObserver?.disconnect();

    if (typeof ResizeObserver === 'undefined' || !this.eventosViewport?.nativeElement) {
      return;
    }

    this.medirAnchoEventos();
    this.eventosResizeObserver = new ResizeObserver(() => this.medirAnchoEventos());
    this.eventosResizeObserver.observe(this.eventosViewport.nativeElement);
  }

  private reiniciarEventosCarrusel(): void {
    this.eventosIndice = 0;
    this.actualizarDesplazamientoEventos(false);
    this.detenerAutoplayEventos();

    if (this.usarCarruselEventos) {
      setTimeout(() => {
        this.observarViewportEventos();
        this.iniciarAutoplayEventos();
      }, 0);
    }
  }

  private medirAnchoEventos(): void {
    const anchoViewport = this.eventosViewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.eventosGapPx * (this.eventosVisibles - 1);
    this.eventosAnchoTarjeta = (anchoViewport - gapsVisibles) / this.eventosVisibles;
    this.actualizarDesplazamientoEventos(false);
  }

  private pasoEventos(): number {
    return this.eventosAnchoTarjeta + this.eventosGapPx;
  }

  private actualizarDesplazamientoEventos(animar: boolean): void {
    this.eventosAnimando = animar;
    this.eventosDesplazamiento = -(this.eventosIndice * this.pasoEventos());
  }

  private iniciarAutoplayEventos(): void {
    this.ngZone.runOutsideAngular(() => {
      this.eventosAutoplayId = setInterval(() => {
        this.ngZone.run(() => this.eventoSiguiente(true));
      }, this.eventosAutoplayMs);
    });
  }

  private detenerAutoplayEventos(): void {
    if (this.eventosAutoplayId) {
      clearInterval(this.eventosAutoplayId);
      this.eventosAutoplayId = undefined;
    }
  }

  private reanudarAutoplayEventos(): void {
    this.detenerAutoplayEventos();
    if (this.usarCarruselEventos) {
      this.iniciarAutoplayEventos();
    }
  }

  eventoAnterior(): void {
    if (!this.usarCarruselEventos) {
      return;
    }

    this.detenerAutoplayEventos();
    this.eventosIndice = this.eventosIndice <= 0 ? this.maxIndiceEventos : this.eventosIndice - 1;
    this.actualizarDesplazamientoEventos(true);
    this.reanudarAutoplayEventos();
  }

  eventoSiguiente(animar = true): void {
    if (!this.usarCarruselEventos) {
      return;
    }

    this.eventosIndice = this.eventosIndice >= this.maxIndiceEventos ? 0 : this.eventosIndice + 1;
    this.actualizarDesplazamientoEventos(animar);
  }

  onEventosPointerDown(event: PointerEvent): void {
    if (!this.usarCarruselEventos) {
      return;
    }

    this.detenerAutoplayEventos();
    this.eventosArrastrando = true;
    this.eventosInicioX = event.clientX;
    this.eventosInicioDesplazamiento = this.eventosDesplazamiento;
    this.eventosAnimando = false;
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  onEventosPointerMove(event: PointerEvent): void {
    if (!this.eventosArrastrando) {
      return;
    }

    const delta = event.clientX - this.eventosInicioX;
    const nuevo = this.eventosInicioDesplazamiento + delta;
    const min = -(this.maxIndiceEventos * this.pasoEventos());
    const max = 0;

    this.eventosDesplazamiento = Math.min(max, Math.max(min, nuevo));
  }

  onEventosPointerUp(event: PointerEvent): void {
    if (!this.eventosArrastrando) {
      return;
    }

    this.eventosArrastrando = false;
    (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);

    const movido = this.eventosDesplazamiento - this.eventosInicioDesplazamiento;
    const umbral = this.pasoEventos() * 0.18;

    if (movido < -umbral && this.eventosIndice < this.maxIndiceEventos) {
      this.eventosIndice += 1;
    } else if (movido > umbral && this.eventosIndice > 0) {
      this.eventosIndice -= 1;
    }

    this.actualizarDesplazamientoEventos(true);
    this.reanudarAutoplayEventos();
  }

  onEventosPointerLeave(event: PointerEvent): void {
    if (this.eventosArrastrando) {
      this.onEventosPointerUp(event);
    }
  }

  get usarCarruselGaleria(): boolean {
    return this.galeriaImpacto.length > this.galeriaVisibles;
  }

  get maxIndiceGaleria(): number {
    return Math.max(0, this.galeriaImpacto.length - this.galeriaVisibles);
  }

  private observarViewportGaleria(): void {
    this.galeriaResizeObserver?.disconnect();

    if (typeof ResizeObserver === 'undefined' || !this.galeriaViewport?.nativeElement) {
      return;
    }

    this.medirAnchoGaleria();
    this.galeriaResizeObserver = new ResizeObserver(() => this.medirAnchoGaleria());
    this.galeriaResizeObserver.observe(this.galeriaViewport.nativeElement);
  }

  private reiniciarGaleriaCarrusel(): void {
    this.galeriaIndice = 0;
    this.actualizarDesplazamientoGaleria(false);
    this.detenerAutoplayGaleria();

    if (this.usarCarruselGaleria) {
      setTimeout(() => {
        this.observarViewportGaleria();
        this.iniciarAutoplayGaleria();
      }, 0);
    }
  }

  private medirAnchoGaleria(): void {
    const anchoViewport = this.galeriaViewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.galeriaGapPx * (this.galeriaVisibles - 1);
    this.galeriaAnchoItem = (anchoViewport - gapsVisibles) / this.galeriaVisibles;
    this.actualizarDesplazamientoGaleria(false);
  }

  private pasoGaleria(): number {
    return this.galeriaAnchoItem + this.galeriaGapPx;
  }

  private actualizarDesplazamientoGaleria(animar: boolean): void {
    this.galeriaAnimando = animar;
    this.galeriaDesplazamiento = -(this.galeriaIndice * this.pasoGaleria());
  }

  private iniciarAutoplayGaleria(): void {
    this.ngZone.runOutsideAngular(() => {
      this.galeriaAutoplayId = setInterval(() => {
        this.ngZone.run(() => this.galeriaSiguiente(true));
      }, this.galeriaAutoplayMs);
    });
  }

  private detenerAutoplayGaleria(): void {
    if (this.galeriaAutoplayId) {
      clearInterval(this.galeriaAutoplayId);
      this.galeriaAutoplayId = undefined;
    }
  }

  private reanudarAutoplayGaleria(): void {
    this.detenerAutoplayGaleria();
    if (this.usarCarruselGaleria) {
      this.iniciarAutoplayGaleria();
    }
  }

  galeriaAnterior(): void {
    if (!this.usarCarruselGaleria) {
      return;
    }

    this.detenerAutoplayGaleria();
    this.galeriaIndice = this.galeriaIndice <= 0 ? this.maxIndiceGaleria : this.galeriaIndice - 1;
    this.actualizarDesplazamientoGaleria(true);
    this.reanudarAutoplayGaleria();
  }

  galeriaSiguiente(animar = true): void {
    if (!this.usarCarruselGaleria) {
      return;
    }

    this.galeriaIndice = this.galeriaIndice >= this.maxIndiceGaleria ? 0 : this.galeriaIndice + 1;
    this.actualizarDesplazamientoGaleria(animar);
  }

  onGaleriaPointerDown(event: PointerEvent): void {
    if (!this.usarCarruselGaleria) {
      return;
    }

    this.detenerAutoplayGaleria();
    this.galeriaArrastrando = true;
    this.galeriaInicioX = event.clientX;
    this.galeriaInicioDesplazamiento = this.galeriaDesplazamiento;
    this.galeriaAnimando = false;
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  onGaleriaPointerMove(event: PointerEvent): void {
    if (!this.galeriaArrastrando) {
      return;
    }

    const delta = event.clientX - this.galeriaInicioX;
    const nuevo = this.galeriaInicioDesplazamiento + delta;
    const min = -(this.maxIndiceGaleria * this.pasoGaleria());
    const max = 0;

    this.galeriaDesplazamiento = Math.min(max, Math.max(min, nuevo));
  }

  onGaleriaPointerUp(event: PointerEvent): void {
    if (!this.galeriaArrastrando) {
      return;
    }

    this.galeriaArrastrando = false;
    (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);

    const movido = this.galeriaDesplazamiento - this.galeriaInicioDesplazamiento;
    const umbral = this.pasoGaleria() * 0.18;

    if (movido < -umbral && this.galeriaIndice < this.maxIndiceGaleria) {
      this.galeriaIndice += 1;
    } else if (movido > umbral && this.galeriaIndice > 0) {
      this.galeriaIndice -= 1;
    }

    this.actualizarDesplazamientoGaleria(true);
    this.reanudarAutoplayGaleria();
  }

  onGaleriaPointerLeave(event: PointerEvent): void {
    if (this.galeriaArrastrando) {
      this.onGaleriaPointerUp(event);
    }
  }

  ngOnInit(): void {
    this.activo = '0';
    this.pagina = '1';
    this.paginas(this.pagina);

    this.videoYoutube('S9xfJWYE3x8');
  }

  toggleConvenio(index: number) {
    if (!this.convenios || !this.convenios[index]) return;
    // alterna el booleano
    this.convenios[index].abierto = !this.convenios[index].abierto;
    // opcional: cerrar los demás (si quieres solo 1 abierto a la vez)
    // this.convenios.forEach((c, i) => { if(i !== index) c.abierto = false; });
  }

  abrirEnlaceDetalle(url: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

}
