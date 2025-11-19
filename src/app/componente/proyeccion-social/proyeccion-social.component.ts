import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-proyeccion-social',
  templateUrl: './proyeccion-social.component.html',
  styleUrls: ['./proyeccion-social.component.css'],
})
export class ProyeccionSocialComponent implements OnInit {
  public logo_pc = 'assets/image/extensioon_proyeccion_social.webp';
  public logo_m = 'assets/image/extensioon_proyeccion_social.webp';

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


  pagina: any;
  activo: any;

  isValid0: boolean = false;
  isValid1: boolean = false;
  isValid2: boolean = false;
  isValid3: boolean = false;
  isValid4: boolean = false;
  isValid5: boolean = false;
  isValid6: boolean = false;

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
    private sanitizer: DomSanitizer
  ) {}

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
