import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

interface Aliado {
  nombre_aliado: string;
  imagen_aliado: string;
  url_aliado?: string;
}

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly visibles = 5;
  readonly gapPx = 16;
  readonly segundosPorTarjeta = 4;

  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;

  listarAliados: Aliado[] = [];
  listarAliadosLoop: Aliado[] = [];

  anchoTarjeta = 168;
  duracionAnimacion = 40;

  private resizeObserver?: ResizeObserver;

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerAliados().subscribe((respuesta) => {
      this.listarAliados = (respuesta as Aliado[]) || [];
      this.actualizarLoop();
    });
  }

  ngAfterViewInit(): void {
    this.medirAncho();

    if (typeof ResizeObserver !== 'undefined' && this.viewport?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => this.medirAncho());
      this.resizeObserver.observe(this.viewport.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  get usarCarrusel(): boolean {
    return this.listarAliados.length > this.visibles;
  }

  getImagenUrl(aliado: Aliado): string {
    const imagen = (aliado.imagen_aliado || '').trim();

    if (!imagen) {
      return '';
    }

    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }

    return `https://ciaf.digital/public/web_aliados/${imagen}`;
  }

  trackByIndice(index: number, aliado: Aliado): string {
    return `${index}-${aliado.nombre_aliado}`;
  }

  private actualizarLoop(): void {
    this.listarAliadosLoop = this.listarAliados.length
      ? [...this.listarAliados, ...this.listarAliados]
      : [];

    this.duracionAnimacion = Math.max(
      24,
      this.listarAliados.length * this.segundosPorTarjeta
    );

    setTimeout(() => this.medirAncho(), 0);
  }

  private medirAncho(): void {
    const anchoViewport = this.viewport?.nativeElement?.clientWidth ?? 0;

    if (!anchoViewport) {
      return;
    }

    const gapsVisibles = this.gapPx * (this.visibles - 1);
    this.anchoTarjeta = (anchoViewport - gapsVisibles) / this.visibles;
  }
}
