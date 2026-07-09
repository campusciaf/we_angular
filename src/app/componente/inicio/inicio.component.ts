import { Component, HostListener, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  creatividadPic: Array<any> = [
    {
      imagen: 'assets/image/emprendimientos.webp',
      titulo: 'Vitrina de Emprendimientos',
      link: '/emprendimientos',
      tipolink: '1',
    },
    {
      imagen: 'assets/image/pereira4ri.webp',
      titulo: 'Pereira 4RI ',
      link: 'https://pereira4ri.com/',
      tipolink: '2',
    },
    {
      imagen: 'assets/image/hub.webp',
      titulo: 'HUB de la Creatividad',
      link: '',
      tipolink: '1',
    },
    {
      imagen: 'assets/image/memorias-institucionales.webp',
      titulo: 'Memorias Institucionales',
      link: 'https://heyzine.com/flip-book/97549097a8.html',
      tipolink: '2',
    },
  ];

  activo: any;
  private scrollSpyIgnorar = false;
  private scrollSpyTick = false;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;

  /** IDs de sección del programa (scroll, no páginas ocultas) */
  readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
    { id: 'impacto-social', nav: '1', label: 'Impacto social' },
    { id: 'adnciaf', nav: '2', label: 'ADN CIAF' },
    { id: 'ofertaprofesional', nav: '3', label: 'Oferta profesional' },
    { id: 'ofertalaboral', nav: '4', label: 'Oferta laboral' },
    { id: 'porqueciaf', nav: '5', label: 'Por qué estudiar en CIAF' },
    { id: 'formularioregistro', nav: '6', label: 'Formulario de registro' },
    { id: 'eventos', nav: '7', label: 'Eventos' },
    { id: 'noticias-home', nav: '8', label: 'Noticias' },
    { id: 'aliados', nav: '9', label: 'Aliados' },
    { id: 'accesosrapidos', nav: '10', label: 'Accesos rápidos' },
    { id: 'newsletter', nav: '11', label: 'Newsletter' },
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

  activarLinkMenu(): void {
    $('#uno').removeClass('active-link-dropdow');
    $('#dos').removeClass('active-link-dropdow');
  }

  ngOnInit(): void {
    this.activarLinkMenu();
  }
}
