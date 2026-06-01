import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

declare const jQuery: any;
declare const $: any;

type SeccionMega = 'oferta' | 'institucion' | 'bienestar' | 'investigacion' | 'egresados';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public img_logo = 'assets/image/logo-negro.webp';
  public img_destino = 'assets/image/ico-destino.webp';
  public img_ubicacion = 'assets/image/ico-location.webp';
  public img_campus = 'assets/image/ico-campus.webp';
  public img_lupa = 'assets/image/lupa.webp';
  public img_lupa_2 = 'assets/image/lupa-2.webp';

  public img_apfacebook = 'assets/image/ap-facebook.webp';
  public img_apinstagram = 'assets/image/ap-instagram.webp';
  public img_apyoutube = 'assets/image/ap-youtube.webp';
  public img_aptwitter = 'assets/image/ap-twitter.webp';
  public img_aptiktok = 'assets/image/ap-tiktok.webp';

  public pagos = 'assets/image/epayco_web.webp';

  megaAbierto: string | null = null;
  seccionActiva: SeccionMega | null = null;

  private megaFijadoPorClic = false;
  private cerrarMegaTimer?: ReturnType<typeof setTimeout>;
  private readonly cerrarMegaDelayMs = 280;
  private routerSub?: Subscription;

  /** Rutas Angular → sección del menú principal */
  private readonly rutasPorSeccion: Record<SeccionMega, string[]> = {
    oferta: [
      'administracion',
      'software',
      'contaduria',
      'sst',
      'industrial',
      'enfermeria',
      'continuada',
      'continuadadetalle',
      'administrativo',
      'veterinaria',
      'adultomayor',
      'motocicletas'
    ],
    institucion: ['conocenos', 'proyeccion-social'],
    bienestar: ['bienestar', 'permanencia', 'bienestarnoticias'],
    investigacion: ['investigaciones', 'relacion-externo', 'sac'],
    egresados: ['egresados', 'egresadosdata']
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarSeccionActiva();

    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.actualizarSeccionActiva());

    this.inicializarMenuLegacy();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();

    if (this.cerrarMegaTimer) {
      clearTimeout(this.cerrarMegaTimer);
    }
  }

  /** Activo si el mega está abierto o si la ruta actual pertenece a esa sección */
  navActivo(id: SeccionMega): boolean {
    return this.megaAbierto === id || this.seccionActiva === id;
  }

  private actualizarSeccionActiva(): void {
    const segmento = this.router.url.split('?')[0].split('/').filter(Boolean)[0] ?? '';
    this.seccionActiva = this.obtenerSeccionPorRuta(segmento);
  }

  private obtenerSeccionPorRuta(segmento: string): SeccionMega | null {
    const entradas = Object.entries(this.rutasPorSeccion) as [SeccionMega, string[]][];

    for (const [seccion, rutas] of entradas) {
      if (rutas.includes(segmento)) {
        return seccion;
      }
    }

    return null;
  }

  abrirMega(id: string): void {
    this.megaFijadoPorClic = false;
    this.cancelarCierreMega();
    this.megaAbierto = id;
  }

  programarCierreMega(): void {
    if (this.megaFijadoPorClic) {
      return;
    }

    this.cancelarCierreMega();
    this.cerrarMegaTimer = setTimeout(() => {
      this.megaAbierto = null;
    }, this.cerrarMegaDelayMs);
  }

  cancelarCierreMega(): void {
    if (this.cerrarMegaTimer) {
      clearTimeout(this.cerrarMegaTimer);
      this.cerrarMegaTimer = undefined;
    }
  }

  alternarMega(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cancelarCierreMega();

    if (this.megaAbierto === id && this.megaFijadoPorClic) {
      this.megaFijadoPorClic = false;
      this.megaAbierto = null;
      return;
    }

    this.megaAbierto = id;
    this.megaFijadoPorClic = true;
  }

  cerrarMega(): void {
    this.cancelarCierreMega();
    this.megaFijadoPorClic = false;
    this.megaAbierto = null;
  }

  onMegaPanelClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.closest('a')) {
      this.cerrarMega();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.has-mega')) {
      this.cerrarMega();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cerrarMega();
  }

  private inicializarMenuLegacy(): void {
    posicionarMenu();

    $(window).scroll(() => {
      posicionarMenu();
    });

    function posicionarMenu(): void {
      const alturaDelHeader = $('.header').outerHeight(true);
      const alturaDelMenu = $('.menu').outerHeight(true) + 50;

      if ($(window).scrollTop() >= alturaDelHeader) {
        $('.menu').addClass('fixed');
        $('.wrapper').css('margin-top', `${alturaDelMenu}px`);
        $('.buscador').hide();
        $('.cross').hide();
        $('.hamburger').show();
      } else {
        $('.menu').removeClass('fixed');
        $('.wrapper').css('margin-top', '50px');
      }
    }

    $('.cross').hide();
    $('.buscador').hide();

    $('.hamburger').click(() => {
      $('.buscador').slideToggle('slow', () => {
        $('.hamburger').hide();
        $('.cross').show();
      });
    });

    $('.cross').click(() => {
      $('.buscador').slideToggle('slow', () => {
        $('.cross').hide();
        $('.hamburger').show();
      });
    });
  }
}
