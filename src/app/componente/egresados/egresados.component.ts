import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NgbModal,
  NgbModalRef,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare var jQuery: any;
declare var $: any;
declare let alertify: any;

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css'],
})
export class EgresadosComponent {
  @ViewChild('myModalInfo', { static: false }) myModalInfo:
    | TemplateRef<any>
    | undefined;

  @ViewChild('modalClubEgresados', { static: false }) modalClubEgresados:
    | TemplateRef<any>
    | undefined;

  @ViewChild('modalBolsaEmpleo', { static: false }) modalBolsaEmpleo:
    | TemplateRef<any>
    | undefined;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  slideConfigContinuada = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    adaptiveHeight: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  public logo_pc = 'assets/egresados/egresado-pc.webp';
  public logo_m = 'assets/image/egresados_m.webp';

  public seguimiento_egresados = 'assets/image/seguimiento_egresados.webp';

  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";

  public modelo_bienestar_egresados = 'assets/image/modelo_bienestar_egresados.webp';

  
  public testimonio_egresado_1 = 'assets/image/testimonio-egresado-1.webp';
  public testimonio_egresado_2 = 'assets/image/testimonio-egresado-2.webp';
  public testimonio_egresado_3 = 'assets/image/testimonio-egresado-3.webp';
  public testimonio_egresado_4 = 'assets/image/testimonio-egresado-4.webp';

  public testimonio_egresado_video = 'assets/video/egresados.mp4';
  

  public aliado_egresados_1 = 'assets/image/aliado_egresados_1.webp';
  public aliado_egresados_2 = 'assets/image/aliado_egresados_2.webp';
  public aliado_egresados_3 = 'assets/image/aliado_egresados_3.webp';

  pagina: any;
  activo: any;
  listarCursos: any;

  
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
        { id: 'comunidad', nav: '1', label: 'Comunidad' },
        { id: 'beneficios', nav: '2', label: 'Beneficios' },
        { id: 'empleabilidad', nav: '3', label: 'Empleabilidad' },
        { id: 'comunidad', nav: '4', label: 'Comunidad' },
        { id: 'educacion-continuada', nav: '5', label: 'Educación Continuada' },
        { id: 'egresados-destacados', nav: '6', label: 'Egresados destacados' },
        { id: 'historias', nav: '7', label: 'Historias' },
        { id: 'galeria-egresados', nav: '8', label: 'Galería de egresados' },
        { id: 'contacto', nav: '9', label: 'Contacto' },
        { id: 'eventos', nav: '10', label: 'Eventos' },
        { id: 'convenios', nav: '11', label: 'Convenios' },
        { id: 'pertenencia', nav: '12', label: 'Pertenencia y acompañamiento' },
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
      window.scroll(0, 0);

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
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.myForm = this.formBuilder.group({
      id_credencial: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.activo = '0';
    this.pagina = '1';
    this.paginas(this.pagina);
    
    this.conectarApiService.obtenerContinuada().subscribe(respuesta=>{
      this.listarCursos=respuesta
    });
  }

  myForm: FormGroup;
  verificarNumeroEgresado: any;
  numericValue: any | undefined;
  $id_credencial: any;
  $nombre: any;
  element1 = true;
  element = false;
  datosUsuario: any;

  captureValue() {
    this.conectarApiService
      .verificarEgresado(this.numericValue)
      .subscribe((respuesta) => {
        this.verificarNumeroEgresado = respuesta;

        if (respuesta.length > 0) {
          this.$id_credencial = respuesta[0].id_credencial;
          this.$nombre = respuesta[0].credencial_nombre;
          alertify.set('notifier', 'position', 'top-center');
          alertify.success(this.$nombre + ' Puede actualizar datos');

          this.conectarApiService
            .verificarRegistro(this.$id_credencial)
            .subscribe((respuesta2) => {
              this.datosUsuario = respuesta2;
              if (respuesta.length >= 1) {
                this.element1 = false;
                this.element = true;

                this.myForm = new FormGroup({
                  id_credencial: new FormControl(this.$id_credencial),
                  egresados_tiene_hijos: new FormControl(
                    this.datosUsuario[0]['egresados_tiene_hijos']
                  ),
                  egresados_num_hijos: new FormControl(
                    this.datosUsuario[0]['egresados_num_hijos']
                  ),
                  egresados_trabaja: new FormControl(
                    this.datosUsuario[0]['egresados_trabaja']
                  ),
                  egresados_tipo_trabajador: new FormControl(
                    this.datosUsuario[0]['egresados_tipo_trabajador']
                  ),
                  egresados_empresa: new FormControl(
                    this.datosUsuario[0]['egresados_empresa']
                  ),
                  egresados_sector_empresa: new FormControl(
                    this.datosUsuario[0]['egresados_sector_empresa']
                  ),
                  egresados_cargo: new FormControl(
                    this.datosUsuario[0]['egresados_cargo']
                  ),
                  egresados_profesion: new FormControl(
                    this.datosUsuario[0]['egresados_profesion']
                  ),
                  egresados_salario: new FormControl(
                    this.datosUsuario[0]['egresados_salario']
                  ),
                  egresados_estudio_adicional: new FormControl(
                    this.datosUsuario[0]['egresados_estudio_adicional']
                  ),
                  egresados_formacion: new FormControl(
                    this.datosUsuario[0]['egresados_formacion']
                  ),
                  egresados_tipo_formacion: new FormControl(
                    this.datosUsuario[0]['egresados_tipo_formacion']
                  ),
                  egresados_informacion: new FormControl(
                    this.datosUsuario[0]['egresados_informacion']
                  ),
                  egresados_posgrado: new FormControl(
                    this.datosUsuario[0]['egresados_posgrado']
                  ),
                  egresados_colaborativa: new FormControl(
                    this.datosUsuario[0]['egresados_colaborativa']
                  ),
                  egresados_actualizacion: new FormControl(
                    this.datosUsuario[0]['egresados_actualizacion']
                  ),
                  egresados_recomendar: new FormControl(
                    this.datosUsuario[0]['egresados_recomendar']
                  ),
                });
                this.organizarformulario();
              }
            });
        } else {
          alertify.set('notifier', 'position', 'top-center');
          alertify.error('No se encuentra en base de datos');
        }
      });
  }

  actualizar() {
    const datos = {
      id_credencial: this.myForm.value.id_credencial,
      egresados_tiene_hijos: this.myForm.value.egresados_tiene_hijos,
      egresados_num_hijos: this.myForm.value.egresados_num_hijos,
      egresados_trabaja: this.myForm.value.egresados_trabaja,
      egresados_tipo_trabajador: this.myForm.value.egresados_tipo_trabajador,
      egresados_empresa: this.myForm.value.egresados_empresa,
      egresados_sector_empresa: this.myForm.value.egresados_sector_empresa,
      egresados_cargo: this.myForm.value.egresados_cargo,
      egresados_profesion: this.myForm.value.egresados_profesion,
      egresados_salario: this.myForm.value.egresados_salario,
      egresados_estudio_adicional:
        this.myForm.value.egresados_estudio_adicional,
      egresados_formacion: this.myForm.value.egresados_formacion,
      egresados_tipo_formacion: this.myForm.value.egresados_tipo_formacion,
      egresados_informacion: this.myForm.value.egresados_informacion,
      egresados_posgrado: this.myForm.value.egresados_posgrado,
      egresados_colaborativa: this.myForm.value.egresados_colaborativa,
      egresados_actualizacion: this.myForm.value.egresados_actualizacion,
      egresados_recomendar: this.myForm.value.egresados_recomendar,
    };

    this.conectarApiService.actualizarEgresado(datos).subscribe((respuesta) => {
      this.verificarNumeroEgresado = respuesta;
      if (respuesta.status == 'ok') {
        alertify.set('notifier', 'position', 'top-center');
        alertify.success('Registro correcto');
        this.element1 = true;
        this.element = false;
        this.numericValue = '';
      } else {
        alertify.set('notifier', 'position', 'top-center');
        alertify.error('Error');
      }
    });
  }

  account_validation_messages = {
    id_credencial: [
      { type: 'required', message: 'Campo numero de identificación' },
      {
        type: 'minlength',
        message: 'Su documento debe tener al menos 8 caracteres',
      },
      {
        type: 'maxlength',
        message: 'Su nombre no puede tener más de 10 caracteres',
      },
      { type: 'pattern', message: 'Su nombre debe contener solo numeros' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_tiene_hijos: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_trabaja: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_estudio_adicional: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'minlength',
        message: 'Su documento debe tener al menos 10 caracteres',
      },
      {
        type: 'maxlength',
        message: 'Su nombre no puede tener más de 150 caracteres',
      },
    ],
    egresados_formacion: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_informacion: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_posgrado: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_colaborativa: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_actualizacion: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    egresados_recomendar: [
      { type: 'required', message: 'Campo de selección' },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
  };

  campo1: any;
  campo3: any;
  campo11: any;

  element2 = true;

  element4 = true;
  element5 = true;
  element6 = true;
  element7 = true;
  element8 = true;
  element9 = true;

  element12 = true;

  organizarformulario() {
    //pregunta si tiene hijos
    this.campo1 = this.myForm.value.egresados_tiene_hijos;
    if (this.campo1 == 'no') {
      this.element2 = true;
    } else {
      this.element2 = false;
    }
    // *****************
    this.campo3 = this.myForm.value.egresados_trabaja;
    if (this.campo3 == 'no') {
      this.element4 = true;
      this.element5 = true;
      this.element6 = true;
      this.element7 = true;
      this.element8 = true;
      this.element9 = true;
    } else {
      this.element4 = false;
      this.element5 = false;
      this.element6 = false;
      this.element7 = false;
      this.element8 = false;
      this.element9 = false;
    }

    this.campo11 = this.myForm.value.egresados_formacion;
    if (this.campo11 == 'no') {
      this.element12 = true;
    } else {
      this.element12 = false;
    }
    // *****************
    console.log(this.campo11);
  }

  mostrarcampo(valor: any) {
    //pregunta si tiene hijos
    if (valor == 1) {
      this.campo1 = this.myForm.value.egresados_tiene_hijos;
      if (this.campo1 == 'no') {
        this.element2 = true;
      } else {
        this.element2 = false;
      }
    }
    // *****************
    if (valor == 3) {
      this.campo3 = this.myForm.value.egresados_trabaja;
      if (this.campo3 == 'no') {
        this.element4 = true;
        this.element5 = true;
        this.element6 = true;
        this.element7 = true;
        this.element8 = true;
        this.element9 = true;
      } else {
        this.element4 = false;
        this.element5 = false;
        this.element6 = false;
        this.element7 = false;
        this.element8 = false;
        this.element9 = false;
      }
    }
    // *****************

    if (valor == 11) {
      this.campo11 = this.myForm.value.egresados_formacion;
      if (this.campo11 == 'no') {
        this.element12 = true;
      } else {
        this.element12 = false;
      }
    }
    // *****************
  }

  mostrarModalInfo() {
    this.element1 = true;
    this.element = false;
    this.modalService.open(this.myModalInfo, { centered: true });
    this.numericValue = '';
  }

  readonly programasClubEgresados = [
    {
      id: 'aprendizaje',
      titulo: 'Aprendizaje a lo largo de la vida',
      descripcion:
        'Oportunidades de formación permanente para que sigas creciendo después de graduarte.',
      icono: 'fa-solid fa-book-open',
    },
    {
      id: 'bienestar',
      titulo: 'Bienestar y estilo de vida',
      descripcion:
        'Programas de bienestar, salud y cultura que acompañan tu calidad de vida como egresado.',
      icono: 'fa-solid fa-heart',
    },
    {
      id: 'descuentos',
      titulo: 'Descuentos en programas de formación',
      descripcion:
        'Beneficios y tarifas preferenciales en cursos, diplomados y programas de actualización profesional.',
      icono: 'fa-solid fa-gift',
    },
    {
      id: 'hub-venture',
      titulo: 'HUB Venture',
      descripcion: 'Acompañamiento al emprendimiento y a las ideas de negocio de nuestros egresados.',
      icono: 'fa-solid fa-lightbulb',
    },
    {
      id: 'consulta',
      titulo: 'Fuente de consulta',
      descripcion: 'Acceso a recursos, información y asesoría institucional cuando lo necesites.',
      icono: 'fa-solid fa-magnifying-glass',
    },
    {
      id: 'modelo-bienestar',
      titulo: 'Modelo de Bienestar Institucional',
      descripcion: 'Estrategias de bienestar que mantienen vivo tu vínculo con la institución.',
      icono: 'fa-solid fa-hand-holding-heart',
    },
    {
      id: 'encuentro-anual',
      titulo: 'Encuentro anual de egresados',
      descripcion: 'Un espacio para reencontrarnos, compartir y fortalecer la comunidad CIAF.',
      icono: 'fa-regular fa-calendar-days',
    },
    {
      id: 'egresado-destacado',
      titulo: 'Reconocimiento Egresado Destacado',
      descripcion: 'Reconocemos las historias de egresados que transforman realidades.',
      icono: 'fa-solid fa-award',
    },
  ];

  programasClubAbiertos: Record<string, boolean> = {};

  abrirModalClubEgresados(): void {
    this.programasClubAbiertos = {};
    this.modalService.open(this.modalClubEgresados, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }

  toggleProgramaClub(id: string): void {
    this.programasClubAbiertos[id] = !this.programasClubAbiertos[id];
  }

  isProgramaClubAbierto(id: string): boolean {
    return !!this.programasClubAbiertos[id];
  }

  unirseClubEgresados(modal: { close: () => void }): void {
    modal.close();
    this.mostrarModalInfo();
  }

  readonly formasParticipacionRed = [
    {
      titulo: 'Voluntariado CIAF',
      descripcion:
        'Comparte tu tiempo y talento apoyando actividades sociales, académicas o institucionales. Tu experiencia puede transformar realidades y motivar a nuevas generaciones.',
      icono: 'fa-solid fa-hand-holding-heart',
    },
    {
      titulo: 'Apadrina un estudiante',
      descripcion:
        'Acompaña el crecimiento de un estudiante CIAF brindando orientación, mentoría o apoyo económico. Ser padrino CIAF es creer en el poder de la educación para cambiar vidas.',
      icono: 'fa-solid fa-user-group',
    },
    {
      titulo: 'Comparte la Experiencia',
      descripcion:
        'Sé parte de nuestros conversatorios, charlas o clases abiertas donde los egresados inspiran con su historia profesional. Tu trayectoria puede convertirse en ejemplo y guía para quienes hoy inician su camino.',
      icono: 'fa-solid fa-wand-magic-sparkles',
    },
  ];

  readonly aliadosBolsaEmpleo = [
    {
      titulo: 'Servicio Público de Empleo',
      enlace: 'https://personas.serviciodeempleo.gov.co/Registrocuenta.aspx',
    },
    {
      titulo: 'Adecco',
      enlace: 'https://empleo.adecco.com.co/account/register',
    },
    {
      titulo: 'Enlace Laboral · Risaralda Emplea',
      enlace: 'https://sites.google.com/camarapereira.org.co/RisaraldaEmplea2025',
    },
  ];

  abrirModalBolsaEmpleo(): void {
    this.modalService.open(this.modalBolsaEmpleo, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }

  dejarDatosRedEgresados(modal: { close: () => void }): void {
    modal.close();
    this.mostrarModalInfo();
  }

  formatearPrecioCurso(precio: number | string | null | undefined): string {
    if (precio == null || precio === '') {
      return '';
    }

    return '$ ' + Number(precio).toLocaleString('es-CO');
  }
}
