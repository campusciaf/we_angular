import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

declare const jQuery: any;
declare const $: any;

type SeccionMega = 'oferta' | 'institucion' | 'bienestar' | 'investigacion' | 'egresados';

interface CollapseInstance {
  show: () => void;
  hide: () => void;
}

interface CollapseApi {
  getInstance: (el: Element) => CollapseInstance | null;
  getOrCreateInstance: (el: Element, options?: { toggle?: boolean }) => CollapseInstance;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  menuMovilAbierto = false;

  private readonly submenusMobile = [
    'mOferta',
    'mInstitucion',
    'mBienestar',
    'mInvestigacion',
    'mEgresados'
  ];

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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.actualizarSeccionActiva();

    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.actualizarSeccionActiva());

    this.inicializarMenuLegacy();
  }

  ngAfterViewInit(): void {
    const menu = document.getElementById('menuMobile');

    if (!menu) {
      return;
    }

    menu.addEventListener('shown.bs.offcanvas', () => {
      this.menuMovilAbierto = true;
      this.cdr.markForCheck();
    });

    menu.addEventListener('hidden.bs.offcanvas', () => {
      this.menuMovilAbierto = false;
      this.cdr.markForCheck();
    });

    this.inicializarAcordeonMobile();
  }

  /** Abre un submenú (cierra los demás) o cierra el mismo si ya está abierto */
  alternarSubmenuMobile(event: Event, collapseId: string): void {
    event.preventDefault();

    const bootstrap = (window as { bootstrap?: { Collapse: CollapseApi } }).bootstrap;
    const collapseEl = document.getElementById(collapseId);

    if (!bootstrap?.Collapse || !collapseEl) {
      return;
    }

    const instance = bootstrap.Collapse.getInstance(collapseEl);

    if (!instance) {
      return;
    }

    if (collapseEl.classList.contains('show')) {
      instance.hide();
      return;
    }

    document.querySelectorAll('#menuAccordion .accordion-collapse.show').forEach((abierto) => {
      bootstrap.Collapse.getInstance(abierto)?.hide();
    });

    instance.show();
  }

  private inicializarAcordeonMobile(): void {
    const bootstrap = (window as { bootstrap?: { Collapse: CollapseApi } }).bootstrap;

    if (!bootstrap?.Collapse) {
      return;
    }

    this.submenusMobile.forEach((id) => {
      const collapseEl = document.getElementById(id);

      if (!collapseEl) {
        return;
      }

      const btn = collapseEl.previousElementSibling as HTMLButtonElement | null;

      bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

      collapseEl.addEventListener('shown.bs.collapse', () => {
        btn?.classList.remove('collapsed');
        btn?.setAttribute('aria-expanded', 'true');
      });

      collapseEl.addEventListener('hidden.bs.collapse', () => {
        btn?.classList.add('collapsed');
        btn?.setAttribute('aria-expanded', 'false');
      });
    });
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
