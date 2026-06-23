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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-bienestar',
  templateUrl: './bienestar.component.html',
  styleUrls: ['./bienestar.component.css']
})
export class BienestarComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly conveniosVisibles = 3;
  readonly conveniosGapPx = 24;
  readonly conveniosAutoplayMs = 5500;

  @ViewChild('conveniosViewport') conveniosViewport?: ElementRef<HTMLElement>;

  conveniosIndice = 0;
  conveniosDesplazamiento = 0;
  conveniosAnchoTarjeta = 0;
  conveniosAnimando = true;
  conveniosArrastrando = false;
  private conveniosAutoplayId?: ReturnType<typeof setInterval>;
  private conveniosResizeObserver?: ResizeObserver;
  private conveniosInicioX = 0;
  private conveniosInicioDesplazamiento = 0;

  public pic1="assets/image/cultura.webp";
  public pic2="assets/image/desarrollo-humano.webp";
  public pic3="assets/image/salud.webp";
  public pic4="assets/image/promocion.webp";
  public pic5="assets/image/deportes.webp";

  


  imagenesExperiencias:Array<any> =[

    {imagen:this.pic1,titulo:'Equilibrio para lograr tus sueños',link:'https://drive.google.com/drive/folders/1oND30Hhz7LTjH-L9WXaP5PZy6MaXKFz5?usp=drive_link'},
    {imagen:this.pic2,titulo:'Guía creativa contra la depresión',link:'https://drive.google.com/drive/folders/18POK6y9X1AIiJatEiOo6eCsJtOlOrIPJ?usp=drive_link'},
    {imagen:this.pic3,titulo:'Tips creativos para controlar la ansiedad',link:'https://drive.google.com/drive/folders/1eRdbd9rdPImor6peVYmU2JKUjaHEB7W8?usp=drive_link'},
    {imagen:this.pic4,titulo:'Pon límites aprendiendo a priorizarte',link:'https://drive.google.com/drive/folders/1DcZ1MW3R0GnzHOVhidvJCT5RZNc2d85p?usp=drive_link'},
    {imagen:this.pic5,titulo:'Mente clara, emociones equilibradas: Gestiona tu bienestar emocional',link:'https://drive.google.com/drive/folders/1dfp46G6RvbpCSACrnfu3Mko6nzlkKMv6?usp=drive_link'},


  ]


public bienestar_pc="assets/image/bienestar.webp";
public bienestar_m="assets/image/bienestar-m.webp";
public parche="assets/image/sumate-al-parche.webp";
public quedate="assets/image/quedate.webp";
public inspiradores="assets/image/inspiradores.webp";
public next="assets/image/btn-next.webp";
public prev="assets/image/btn-prev.webp";

public b_salud="assets/image/b_salud.webp";
public b_deportes="assets/image/b_deportes.webp";
public b_cultura="assets/image/b_cultura.webp";
public b_desarrollo="assets/image/b_desarrollo.webp";
public b_promocion="assets/image/b_promocion.webp";
public b_grado="assets/image/b_grado.webp";

public ico_salud="assets/image/ico-salud.webp";
public ico_deportes="assets/image/ico-deportes.webp";
public ico_arte="assets/image/ico-arte.webp";
public ico_humano="assets/image/ico-humano.webp";
public ico_social="assets/image/ico-social.webp";
public ico_grado="assets/image/ico-grado.webp";

public banner_prueba="assets/image/prueba_instagram.webp";
public icono_psi="assets/image/icono-psi.webp";
public icono_deportes="assets/image/icono-deportes.webp";

public icono_sound="assets/image/icono-sound.webp";
public icono_baile="assets/image/icono-baile.webp";
public icono_fotografia="assets/image/icono-fotografia.webp";

listarInstagram:any;
listarConvenios:any;




slideConfig = {
  "slidesToShow": 4, "slidesToScroll": 1, "dots": true, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
  responsive: [
    {
      breakpoint: 1048,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 778,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]

};

slideConfigConvenios = {
  "slidesToShow": 3, "slidesToScroll": 1, "dots": true, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
  responsive: [
    {
      breakpoint: 1048,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 778,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]

};

@ViewChild('slickModal')
slickModal!: SlickCarouselComponent;



prevImg(){
  this.slickModal.slickPrev();
}
nextImg(){
  this.slickModal.slickNext();
}

@ViewChild('slickModalInst')
slickModalInst!: SlickCarouselComponent;

prevImgIns(){
  this.slickModalInst.slickPrev();
}
nextImgIns(){
  this.slickModalInst.slickNext();
}

@ViewChild('slickModalConv')
slickModalConv!: SlickCarouselComponent;

prevImgConv(){
  this.slickModalConv.slickPrev();
}
nextImgConv(){
  this.slickModalConv.slickNext();
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


  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;
  


    /** IDs de sección del programa (scroll, no páginas ocultas) */
    readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
      { id: 'transformacion-humana', nav: '1', label: 'Transformacion Humana' },
      { id: 'programa-de-permanencia', nav: '2', label: 'Programas de permanencia' },
      { id: 'salud-y-vida', nav: '3', label: 'salud y vida' },
      { id: 'deporte-y-recreacion', nav: '4', label: 'Deporte y recreacion' },
      { id: 'arte-y-cultura', nav: '5', label: 'Arte y cultura' },
      { id: 'desarrollo-humano', nav: '6', label: 'Desarrollo Humano' },
      { id: 'promocion-socioeconomica', nav: '7', label: 'Promocion Socioeconomica' },
      { id: 'bienestar-en-video', nav: '8', label: 'Bienestar en video' },
      { id: 'orientacion', nav: '9', label: 'Orientacion psicosocial' },
      { id: 'convenios-y-beneficios', nav: '10', label: 'Convenios y beneficios' },
      { id: 'formula', nav: '11', label: 'Formula 4x5' },
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
  
  ngOnDestroy(): void {
    if (this.scrollSpyTimer) {
      clearTimeout(this.scrollSpyTimer);
    }
    this.detenerAutoplayConvenios();
    this.conveniosResizeObserver?.disconnect();
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
    animarnoticia(id:any){
      $(".accion"+id).css("top","-40px");
    }
    noanimarnoticia(id:any){
      $(".accion"+id).css("top","0px");
    }

    activarLinkMenu(){
      $("#uno").removeClass("active-link-dropdow");
      $("#dos").removeClass("active-link-dropdow");
    }

  videoUrl: SafeResourceUrl | null = null;
  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.activo="0";
    this.pagina="0";
    this.paginas(this.pagina);

    // this.conectarApiService.obtenerInstagram().subscribe(respuesta=>{
    //   this.listarInstagram=respuesta.business_discovery.media.data
    //   console.log(respuesta.business_discovery.media.data);
    // });

    this.conectarApiService.obtenerBienestarConvenios().subscribe(respuesta2 => {
      this.listarConvenios = respuesta2;
      this.reiniciarConveniosCarrusel();
    });

    
    this.activarLinkMenu();
  }

  ngAfterViewInit(): void {
    this.observarViewportConvenios();
  }

  private observarViewportConvenios(): void {
    this.conveniosResizeObserver?.disconnect();

    if (typeof ResizeObserver === 'undefined' || !this.conveniosViewport?.nativeElement) {
      return;
    }

    this.medirAnchoConvenios();
    this.conveniosResizeObserver = new ResizeObserver(() => this.medirAnchoConvenios());
    this.conveniosResizeObserver.observe(this.conveniosViewport.nativeElement);
  }

  get usarCarruselConvenios(): boolean {
    return Array.isArray(this.listarConvenios) && this.listarConvenios.length > this.conveniosVisibles;
  }

  get maxIndiceConvenios(): number {
    const total = Array.isArray(this.listarConvenios) ? this.listarConvenios.length : 0;
    return Math.max(0, total - this.conveniosVisibles);
  }

  private reiniciarConveniosCarrusel(): void {
    this.conveniosIndice = 0;
    this.actualizarDesplazamientoConvenios(false);
    this.detenerAutoplayConvenios();

    if (this.usarCarruselConvenios) {
      setTimeout(() => {
        this.observarViewportConvenios();
        this.iniciarAutoplayConvenios();
      }, 0);
    }
  }

  private medirAnchoConvenios(): void {
    const anchoViewport = this.conveniosViewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.conveniosGapPx * (this.conveniosVisibles - 1);
    this.conveniosAnchoTarjeta = (anchoViewport - gapsVisibles) / this.conveniosVisibles;
    this.actualizarDesplazamientoConvenios(false);
  }

  private pasoConvenios(): number {
    return this.conveniosAnchoTarjeta + this.conveniosGapPx;
  }

  private actualizarDesplazamientoConvenios(animar: boolean): void {
    this.conveniosAnimando = animar;
    this.conveniosDesplazamiento = -(this.conveniosIndice * this.pasoConvenios());
  }

  private iniciarAutoplayConvenios(): void {
    this.ngZone.runOutsideAngular(() => {
      this.conveniosAutoplayId = setInterval(() => {
        this.ngZone.run(() => this.siguienteConvenio(true));
      }, this.conveniosAutoplayMs);
    });
  }

  private detenerAutoplayConvenios(): void {
    if (this.conveniosAutoplayId) {
      clearInterval(this.conveniosAutoplayId);
      this.conveniosAutoplayId = undefined;
    }
  }

  private reanudarAutoplayConvenios(): void {
    this.detenerAutoplayConvenios();
    if (this.usarCarruselConvenios) {
      this.iniciarAutoplayConvenios();
    }
  }

  private siguienteConvenio(animar = true): void {
    if (!this.usarCarruselConvenios) {
      return;
    }

    this.conveniosIndice = this.conveniosIndice >= this.maxIndiceConvenios ? 0 : this.conveniosIndice + 1;
    this.actualizarDesplazamientoConvenios(animar);
  }

  onConveniosPointerDown(event: PointerEvent): void {
    if (!this.usarCarruselConvenios) {
      return;
    }

    this.detenerAutoplayConvenios();
    this.conveniosArrastrando = true;
    this.conveniosInicioX = event.clientX;
    this.conveniosInicioDesplazamiento = this.conveniosDesplazamiento;
    this.conveniosAnimando = false;
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  onConveniosPointerMove(event: PointerEvent): void {
    if (!this.conveniosArrastrando) {
      return;
    }

    const delta = event.clientX - this.conveniosInicioX;
    let nuevo = this.conveniosInicioDesplazamiento + delta;
    const min = -(this.maxIndiceConvenios * this.pasoConvenios());
    const max = 0;

    this.conveniosDesplazamiento = Math.min(max, Math.max(min, nuevo));
  }

  onConveniosPointerUp(event: PointerEvent): void {
    if (!this.conveniosArrastrando) {
      return;
    }

    this.conveniosArrastrando = false;
    (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);

    const movido = this.conveniosDesplazamiento - this.conveniosInicioDesplazamiento;
    const umbral = this.pasoConvenios() * 0.18;

    if (movido < -umbral && this.conveniosIndice < this.maxIndiceConvenios) {
      this.conveniosIndice += 1;
    } else if (movido > umbral && this.conveniosIndice > 0) {
      this.conveniosIndice -= 1;
    }

    this.actualizarDesplazamientoConvenios(true);
    this.reanudarAutoplayConvenios();
  }

  onConveniosPointerLeave(event: PointerEvent): void {
    if (this.conveniosArrastrando) {
      this.onConveniosPointerUp(event);
    }
  }

  abrirVideo(videoId: string): void {

    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?rel=0`
      );
  
  }
  
  cerrarVideo(): void {
  
    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl('');
  
  }
  



}
