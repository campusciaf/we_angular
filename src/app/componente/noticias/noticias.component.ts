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

  titulo: string | undefined;
  total: any;

  id: string[] | null = this._route.snapshot.paramMap.getAll('id');

  constructor(
    private conectarApiService: ConectarApiService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerNoticiasPrincipal('codefc').subscribe(respuesta => {
      this.listarNoticiasPrincipal = (respuesta as Noticia[]) || [];
    });

    this.conectarApiService.obtenerNoticias().subscribe(respuesta => {
      this.listarNoticias = (respuesta as Noticia[]) || [];
    });

    if (this.id?.length) {
      this.conectarApiService.obtenerNoticiaId(this.id).subscribe(respuesta => {
        this.detalleNoticia = (respuesta as Noticia[]) || [];
        this.tipobusquedad = this.id?.[0];
      });
    }
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

  traerNoticia(): void {
    this.conectarApiService.obtenerNoticiaId(this.id).subscribe(respuesta => {
      this.detalleNoticia = (respuesta as Noticia[]) || [];
      this.tipobusquedad = this.id?.[0];
    });
  }
}
