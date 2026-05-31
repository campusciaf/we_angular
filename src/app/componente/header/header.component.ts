import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';



declare const jQuery: any;

declare const $: any;



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



  /** Mega menú abierto (desktop) */

  megaAbierto: string | null = null;

  private megaFijadoPorClic = false;

  private cerrarMegaTimer?: ReturnType<typeof setTimeout>;

  private readonly cerrarMegaDelayMs = 280;



  ngOnInit(): void {

    this.inicializarMenuLegacy();

  }



  ngOnDestroy(): void {

    if (this.cerrarMegaTimer) {

      clearTimeout(this.cerrarMegaTimer);

    }

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


