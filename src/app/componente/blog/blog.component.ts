import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;
declare var $: any;

interface BlogTocItem {
  id: string;
  titulo: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  safeSrc: SafeResourceUrl | undefined;

  public calendario = 'assets/image/calendario-regular.webp';
  public vistas = 'assets/image/vistas.webp';

  public prev = 'assets/image/prev.webp';
  public next = 'assets/image/next.webp';
  public btn_next = 'assets/image/btn-next.webp';
  public urlActual = '';

  listarBlog: any[] = [];
  listarBlog2: any;
  detalleBlog: any;
  listarBlogPrincipal: any;
  listarBlogCategorias: any;
  categoriaSeleccionada = '';
  textoBusqueda = '';

  tipobusquedad: any;

  private contenidoBlogCache = new Map<
    string,
    { html: SafeHtml; tabla: BlogTocItem[] }
  >();
  private firmaAutorCache = new Map<string, SafeHtml>();

  get hayFiltrosActivos(): boolean {
    return (
      this.normalizarTexto(this.categoriaSeleccionada) !== '' ||
      this.normalizarTexto(this.textoBusqueda) !== ''
    );
  }

  get blogFiltrados(): any[] {
    if (!Array.isArray(this.listarBlog)) {
      return [];
    }

    const categoriaFiltro = this.normalizarTexto(this.categoriaSeleccionada);
    const textoFiltro = this.normalizarTexto(this.textoBusqueda);

    return this.listarBlog.filter((blog) => {
      const categoriaBlog = this.normalizarTexto(
        blog?.nombre_categoria || blog?.categoria_blog || '',
      );

      if (categoriaFiltro && categoriaBlog !== categoriaFiltro) {
        return false;
      }

      if (!textoFiltro) {
        return true;
      }

      const camposBusqueda = [
        blog?.titulo_blog,
        blog?.subtitulo_blog,
        blog?.nombre_categoria,
        blog?.categoria_blog,
        blog?.nombre_autor,
        this.getExcerpt(blog),
      ]
        .map((valor) => this.normalizarTexto(valor))
        .filter(Boolean);

      return camposBusqueda.some((campo) => campo.includes(textoFiltro));
    });
  }

  get blogDestacado(): any | null {
    if (this.tipobusquedad != undefined || this.hayFiltrosActivos) {
      return null;
    }

    return this.blogFiltrados.length ? this.blogFiltrados[0] : null;
  }

  get entradasBlog(): any[] {
    const blogs = this.blogFiltrados;

    if (!blogs.length) {
      return [];
    }

    if (this.tipobusquedad == undefined && !this.hayFiltrosActivos) {
      return blogs.slice(1);
    }

    return blogs;
  }

  seleccionarCategoria(nombreCategoria: string): void {
    const categoriaNormalizada = this.normalizarTexto(nombreCategoria);
    const seleccionActual = this.normalizarTexto(this.categoriaSeleccionada);

    this.categoriaSeleccionada =
      categoriaNormalizada === seleccionActual ? '' : String(nombreCategoria || '');
  }

  limpiarFiltrosBlog(): void {
    this.categoriaSeleccionada = '';
    this.textoBusqueda = '';
  }

  isCategoriaActiva(nombreCategoria: string): boolean {
    return (
      this.normalizarTexto(nombreCategoria) ===
      this.normalizarTexto(this.categoriaSeleccionada)
    );
  }

  aplicarFiltros(): void {
    this.textoBusqueda = String(this.textoBusqueda || '');
  }

  private normalizarTexto(valor: any): string {
    return String(valor || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  etiquetaCategoria(blog: any): string {
    const categoria = blog?.categoria_blog || blog?.nombre_categoria || 'Blog';
    return String(categoria).trim();
  }

  getAutorBlog(blog: any): string {
    const autor = blog?.nombre_autor;
    return String(autor || '').trim() || 'Equipo CIAF';
  }

  getExcerpt(blog: any): string {
    const html = blog?.contenido_blog || blog?.contenido_blog || '';
    return this.htmlToPlainText(String(html));
  }

  private htmlToPlainText(html: string): string {
    if (!html) {
      return '';
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');

    return (doc.body.textContent || '')
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getTablaContenido(contenido: string | null | undefined): BlogTocItem[] {
    return this.obtenerContenidoBlogProcesado(contenido).tabla;
  }

  getContenidoProcesado(contenido: string | null | undefined): SafeHtml {
    return this.obtenerContenidoBlogProcesado(contenido).html;
  }

  getFirmaAutorProcesada(firma: string | null | undefined): SafeHtml {
    const key = firma || '';

    if (!key) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    const cached = this.firmaAutorCache.get(key);

    if (cached) {
      return cached;
    }

    const procesada = this.procesarFirmaAutor(key);
    this.firmaAutorCache.set(key, procesada);
    return procesada;
  }

  private procesarFirmaAutor(html: string): SafeHtml {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      `<div class="blog-firma-autor__content">${html}</div>`,
      'text/html',
    );
    const wrapper = doc.body.firstElementChild;

    if (!wrapper) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    const primerBloque = wrapper.querySelector('p');
    const lineas = primerBloque ? this.extraerLineasFirma(primerBloque) : [];

    if (primerBloque && lineas.length >= 3) {
      const encabezado = doc.createElement('div');
      encabezado.className = 'blog-firma-autor__header';

      const linea1 = doc.createElement('div');
      linea1.className = 'fs-20 fw-black text-color-2 lh-1';
      linea1.textContent = lineas[0];

      const linea2 = doc.createElement('div');
      linea2.className = 'fs-14 text-color-2 lh-1';
      linea2.textContent = lineas[1];

      const linea3 = doc.createElement('div');
      linea3.className = 'fs-12 lh-1';
      linea3.textContent = lineas[2];

      encabezado.append(linea1, linea2, linea3);
      primerBloque.replaceWith(encabezado);

      if (lineas.length > 3) {
        const extra = doc.createElement('p');
        extra.className = 'fs-14 blog-firma-autor__bio';
        extra.textContent = lineas.slice(3).join(' ');
        encabezado.after(extra);
      }
    }

    const bioParrafos = wrapper.querySelectorAll('p');

    bioParrafos.forEach((parrafo, index) => {
      parrafo.classList.add('fs-14', 'blog-firma-autor__bio');

      if (index === 0) {
        parrafo.classList.add('mt-4');
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml(wrapper.innerHTML);
  }

  private extraerLineasFirma(elemento: Element): string[] {
    const lineas: string[] = [];
    let actual = '';

    const procesarNodo = (nodo: Node): void => {
      if (nodo.nodeType === Node.TEXT_NODE) {
        actual += nodo.textContent || '';
        return;
      }

      if (nodo.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const el = nodo as Element;

      if (el.tagName === 'BR') {
        lineas.push(actual.replace(/\s+/g, ' ').trim());
        actual = '';
        return;
      }

      el.childNodes.forEach(procesarNodo);
    };

    elemento.childNodes.forEach(procesarNodo);

    if (actual.trim()) {
      lineas.push(actual.replace(/\s+/g, ' ').trim());
    }

    return lineas.filter(Boolean);
  }

  scrollToContenido(anchorId: string, event?: Event): void {
    event?.preventDefault();

    const el = document.getElementById(anchorId);
    if (!el) {
      return;
    }

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      this.getBlogScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  private getBlogScrollOffset(): number {
    return 38 + 78 + 24;
  }

  private obtenerContenidoBlogProcesado(contenido: string | null | undefined): {
    html: SafeHtml;
    tabla: BlogTocItem[];
  } {
    const key = contenido || '';
    const cached = this.contenidoBlogCache.get(key);

    if (cached) {
      return cached;
    }

    const procesado = this.procesarContenidoBlog(key);
    this.contenidoBlogCache.set(key, procesado);
    return procesado;
  }

  private procesarContenidoBlog(html: string): {
    html: SafeHtml;
    tabla: BlogTocItem[];
  } {
    if (!html) {
      return {
        html: this.sanitizer.bypassSecurityTrustHtml(''),
        tabla: [],
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const wrapper = doc.body.firstElementChild;

    if (!wrapper) {
      return {
        html: this.sanitizer.bypassSecurityTrustHtml(html),
        tabla: [],
      };
    }

    const tabla: BlogTocItem[] = [];
    const idsUsados = new Set<string>();
    const h2s = wrapper.querySelectorAll('h2');

    h2s.forEach((h2, index) => {
      const titulo =
        h2.textContent?.replace(/\s+/g, ' ').trim() || `Sección ${index + 1}`;
      const id = this.generarIdAncla(titulo, index, idsUsados);

      h2.id = id;
      h2.classList.add(
        'fs-24',
        'fw-black',
        'text-color-2',
        'blog-contenido__heading',
      );

      tabla.push({ id, titulo });
    });

    return {
      html: this.sanitizer.bypassSecurityTrustHtml(wrapper.innerHTML),
      tabla,
    };
  }

  private generarIdAncla(
    titulo: string,
    index: number,
    idsUsados: Set<string>,
  ): string {
    const slug = titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let id = `blog-seccion-${slug || index + 1}`;
    let contador = 2;

    while (idsUsados.has(id)) {
      id = `blog-seccion-${slug || index + 1}-${contador}`;
      contador++;
    }

    idsUsados.add(id);
    return id;
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
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
          slidesToShow: 1,
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

  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  prevImg() {
    this.slickModal.slickPrev();
  }
  nextImg() {
    this.slickModal.slickNext();
  }

  titulo: any;
  total: any;
  valor: any;
  activo: any;

  private scrollSpyIgnorar = false;
  private scrollSpyTick = false;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;

  campoAccionActivo: string | null = null;

  toggleCampoAccion(id: string): void {
    this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
  }

  /** IDs de sección del programa (scroll, no páginas ocultas) */
  readonly seccionesPrograma: { id: string; nav: string; label: string }[] = [
    { id: 'quienes-somos', nav: '1', label: 'Quienes somos' },
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

  videoYoutube(valor: any, titulo: any) {
    this.titulo = titulo;
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + valor,
    );
  }

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private _route: ActivatedRoute,
  ) {}
  closeResult = '';

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  animarnoticia(id: any) {
    $('.accion' + id).css('height', '80px');
  }
  noanimarnoticia(id: any) {
    $('.accion' + id).css('height', '0px');
  }

  id: any = this._route.snapshot.paramMap.getAll('id');

  ngOnInit(): void {
    this.urlActual = window.location.href;

    this.conectarApiService.obtenerBlogId(this.id).subscribe((respuesta) => {
      this.contenidoBlogCache.clear();
      this.firmaAutorCache.clear();
      this.detalleBlog = respuesta;
      this.tipobusquedad = this.id[0];
    });

    this.conectarApiService.obtenerBlog().subscribe((respuesta) => {
      this.listarBlog = Array.isArray(respuesta) ? respuesta : [];
      this.tipobusquedad = this.id[0];
    });

    this.conectarApiService.obtenerBlogCategorias().subscribe((respuesta) => {
      this.listarBlogCategorias = Array.isArray(respuesta) ? respuesta : [];
      console.log('listarBlogCategorias', this.listarBlogCategorias);
    });
  }

  traerBlog() {
    this.conectarApiService.obtenerBlogId(this.id).subscribe((respuesta) => {
      this.contenidoBlogCache.clear();
      this.firmaAutorCache.clear();
      this.detalleBlog = respuesta;

      this.tipobusquedad = this.id[0];
    });
  }
}
