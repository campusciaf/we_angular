import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

interface Noticia {
  material: string | number;
  img_noticias: string;
  titulo_noticias: string;
  subtitulo_noticias?: string;
  contenido_noticias: string;
  fecha_noticias: string;
  nombre_categoria: string;
  color?: string;
  link_noticia: string;
  url_video?: string;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  listarNoticias: Noticia[] = [];
  detalleNoticia: Noticia[] = [];
  listarNoticiasPrincipal: Noticia[] = [];
  tipobusquedad: string | undefined;
  categoriaSeleccionada = '';
  urlActual = '';

  titulo: string | undefined;
  total: any;

  id: string[] = [];

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlActual = window.location.href;

    this.conectarApiService.obtenerNoticiasPrincipal('codefc').subscribe(respuesta => {
      this.listarNoticiasPrincipal = (respuesta as Noticia[]) || [];
    });

    this.conectarApiService.obtenerNoticias().subscribe(respuesta => {
      this.listarNoticias = this.ordenarPorFecha((respuesta as Noticia[]) || []);
    });

    // Misma ruta/componente para listado y detalle: hay que reaccionar al :id
    this._route.paramMap.subscribe(params => {
      const noticiaId = params.get('id');
      this.urlActual = window.location.href;

      if (noticiaId) {
        this.id = [noticiaId];
        this.cargarDetalle(noticiaId);
        return;
      }

      this.id = [];
      this.tipobusquedad = undefined;
      this.detalleNoticia = [];
    });
  }

  get categorias(): string[] {
    const nombres = this.listarNoticias
      .map(noticia => (noticia.nombre_categoria || '').trim())
      .filter(Boolean);

    return [...new Set(nombres)].sort((a, b) => a.localeCompare(b, 'es'));
  }

  get hayFiltroActivo(): boolean {
    return this.normalizarTexto(this.categoriaSeleccionada) !== '';
  }

  get noticiasFiltradas(): Noticia[] {
    const categoriaFiltro = this.normalizarTexto(this.categoriaSeleccionada);

    if (!categoriaFiltro) {
      return this.listarNoticias;
    }

    return this.listarNoticias.filter(noticia =>
      this.normalizarTexto(noticia.nombre_categoria) === categoriaFiltro
    );
  }

  get noticiaDestacada(): Noticia | null {
    if (this.hayFiltroActivo) {
      return null;
    }

    return this.noticiasFiltradas.length ? this.noticiasFiltradas[0] : null;
  }

  get noticiasListado(): Noticia[] {
    const noticias = this.noticiasFiltradas;

    if (!noticias.length) {
      return [];
    }

    if (!this.hayFiltroActivo) {
      return noticias.slice(1);
    }

    return noticias;
  }

  seleccionarCategoria(nombreCategoria: string): void {
    const categoriaNormalizada = this.normalizarTexto(nombreCategoria);
    const seleccionActual = this.normalizarTexto(this.categoriaSeleccionada);

    this.categoriaSeleccionada =
      categoriaNormalizada === seleccionActual ? '' : String(nombreCategoria || '');
  }

  limpiarFiltro(): void {
    this.categoriaSeleccionada = '';
  }

  isCategoriaActiva(nombreCategoria: string): boolean {
    return (
      this.normalizarTexto(nombreCategoria) ===
      this.normalizarTexto(this.categoriaSeleccionada)
    );
  }

  private normalizarTexto(valor: unknown): string {
    return String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private ordenarPorFecha(noticias: Noticia[]): Noticia[] {
    return [...noticias].sort((a, b) => {
      const fechaA = new Date(a.fecha_noticias || 0).getTime();
      const fechaB = new Date(b.fecha_noticias || 0).getTime();
      return fechaB - fechaA;
    });
  }

  private cargarDetalle(noticiaId: string): void {
    this.conectarApiService.obtenerNoticiaId(noticiaId).subscribe(respuesta => {
      this.detalleNoticia = (respuesta as Noticia[]) || [];
      this.tipobusquedad = noticiaId;
    });
  }

  esVideo(noticia: Noticia): boolean {
    return String(noticia.material) === '1';
  }

  getImagenUrl(noticia: Noticia): string {
    const imagen = (noticia.img_noticias || '').trim();

    if (!imagen) {
      return '';
    }

    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }

    return `https://ciaf.digital/public/web_noticias/${imagen}`;
  }

  getExcerpt(noticia: Noticia): string {
    const texto = (noticia.subtitulo_noticias || noticia.contenido_noticias || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!texto) {
      return '';
    }

    return texto.length > 130 ? `${texto.slice(0, 130)}...` : texto;
  }

  videoYoutube(valor: string, titulo: string): void {
    this.titulo = titulo;
    this.total = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${valor}`);
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {},
      (reason) => {
        this.getDismissReason(reason);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return `with: ${reason}`;
  }

  traerNoticia(linkNoticia?: string): void {
    const noticiaId = linkNoticia || this._route.snapshot.paramMap.get('id') || this.id[0];

    if (!noticiaId) {
      return;
    }

    this.id = [noticiaId];
    this.cargarDetalle(noticiaId);
  }
}
