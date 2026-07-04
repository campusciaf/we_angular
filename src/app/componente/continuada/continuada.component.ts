import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-continuada',
  templateUrl: './continuada.component.html',
  styleUrls: ['./continuada.component.css'],
})
export class ContinuadaComponent implements OnInit {
  public educacion_continuada = 'assets/image/educacion-continuada.webp';
  public educacion_continuada_movil =
    'assets/image/educacion-continuada-movil.webp';
  public logo_continuada = 'assets/image/logo-continuada.webp';

  listarCursos: any[] = [];
  tiposCurso: string[] = [];
  modalidadesCurso: string[] = [];
  filtroTipo = 'todos';
  filtroModalidad = 'todos';

  get cursosFiltrados(): any[] {
    return this.listarCursos.filter((curso) => {
      const tipoOk =
        this.filtroTipo === 'todos' ||
        this.valorCurso(
          this.obtenerCampo(curso, ['categoria', 'tipo_curso', 'tipo']),
          'curso',
        ) === this.filtroTipo;
      const modalidadOk =
        this.filtroModalidad === 'todos' ||
        this.valorCurso(
          this.obtenerCampo(curso, ['modalidad_curso', 'modalidad']),
        ) === this.filtroModalidad;

      return tipoOk && modalidadOk;
    });
  }

  activarLinkMenu() {
    $('#uno').removeClass('active-link-dropdow');
    $('#dos').removeClass('active-link-dropdow');
  }

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerContinuada().subscribe((respuesta) => {
      this.listarCursos = this.normalizarCursos(respuesta);
      this.construirOpcionesFiltro();
    });

    this.activarLinkMenu();
  }

  seleccionarFiltroTipo(tipo: string): void {
    this.filtroTipo = tipo;
  }

  seleccionarFiltroModalidad(modalidad: string): void {
    this.filtroModalidad = modalidad;
  }

  limpiarFiltros(): void {
    this.filtroTipo = 'todos';
    this.filtroModalidad = 'todos';
  }

  scrollToSeccion(sectionId: string, event?: Event): void {
    event?.preventDefault();

    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY - this.getScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  private getScrollOffset(): number {
    return 38 + 78 + 24;
  }

  etiquetaFiltro(valor: string): string {
    if (!valor || valor === 'todos') {
      return valor;
    }

    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }

  etiquetaCurso(
    curso: any,
    campo: 'categoria' | 'modalidad_curso',
    fallback = '',
  ): string {
    const valor =
      campo === 'categoria'
        ? this.valorCurso(
            this.obtenerCampo(curso, ['categoria', 'tipo_curso', 'tipo']),
            fallback || 'curso',
          )
        : this.valorCurso(
            this.obtenerCampo(curso, ['modalidad_curso', 'modalidad']),
          );

    return this.etiquetaFiltro(valor);
  }

  formatearPrecioCurso(precio: number | string | null | undefined): string {
    if (precio == null || precio === '') {
      return '';
    }

    return '$ ' + Number(precio).toLocaleString('es-CO');
  }

  private normalizarCursos(respuesta: any): any[] {
    if (Array.isArray(respuesta)) {
      return respuesta;
    }

    if (respuesta && Array.isArray(respuesta.data)) {
      return respuesta.data;
    }

    if (respuesta && typeof respuesta === 'object') {
      const cursos = Object.values(respuesta).filter(
        (item) =>
          item && typeof item === 'object' && 'id_curso' in (item as object),
      );

      if (cursos.length) {
        return cursos as any[];
      }
    }

    return respuesta ? [respuesta] : [];
  }

  private construirOpcionesFiltro(): void {
    const tipos = new Set<string>();
    const modalidades = new Set<string>();

    this.listarCursos.forEach((curso) => {
      const tipo = this.valorCurso(
        this.obtenerCampo(curso, ['categoria', 'tipo_curso', 'tipo']),
        'curso',
      );
      if (tipo) {
        tipos.add(tipo);
      }

      const modalidad = this.valorCurso(
        this.obtenerCampo(curso, ['modalidad_curso', 'modalidad']),
      );
      if (modalidad) {
        modalidades.add(modalidad);
      }
    });

    this.tiposCurso = [...tipos].sort((a, b) => a.localeCompare(b, 'es'));
    this.modalidadesCurso = [...modalidades].sort((a, b) =>
      a.localeCompare(b, 'es'),
    );
  }

  private obtenerCampo(curso: any, campos: string[]): unknown {
    for (const campo of campos) {
      if (curso?.[campo] != null && String(curso[campo]).trim() !== '') {
        return curso[campo];
      }
    }

    return null;
  }

  private valorCurso(valor: unknown, fallback = ''): string {
    if (valor == null) {
      return fallback;
    }

    return String(valor).trim().toLowerCase();
  }
}
