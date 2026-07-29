import { Component, Input, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {
  @Input() programId!: number;
  @Input() isProfessional: boolean = true;

  valorInscripcion: number = 0;
  valorSeguro: number = 0;
  valorInscripcionTotal: number = 0;
  valorMatriculaAnterior: number = 0;
  valorMatriculaActual: number = 0;
  jornadas: string = '';

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    if (this.programId) {
      this.conectarApiService.obtenerProgramaId(this.programId).subscribe({
        next: (respuesta: any) => {
          if (respuesta && respuesta.valores) {
            const v = respuesta.valores;
            this.valorInscripcion = Number(v.valor_inscripcion);
            this.valorSeguro = Number(v.valor_seguro);
            this.valorInscripcionTotal = Number(v.valor_inscripcion_total);
            this.valorMatriculaAnterior = Number(v.valor_matricula_anterior);
            this.valorMatriculaActual = Number(v.valor_matricula_actual);
          } else {
            this.cargarFallbackValores();
          }

          if (respuesta && respuesta.programa) {
            this.jornadas = respuesta.programa.jornadas || '';
          } else {
            this.cargarFallbackJornadas();
          }
        },
        error: (err) => {
          console.error('Error al cargar costos:', err);
          this.cargarFallbackValores();
          this.cargarFallbackJornadas();
        }
      });
    } else {
      this.cargarFallbackValores();
      this.cargarFallbackJornadas();
    }
  }

  private cargarFallbackValores(): void {
    if (this.isProfessional) {
      this.valorInscripcion = 129987;
      this.valorSeguro = 14860;
      this.valorInscripcionTotal = 144847;
      this.valorMatriculaAnterior = 3220000;
      this.valorMatriculaActual = 3220000;
    } else {
      this.valorInscripcion = 48500;
      this.valorSeguro = 14860;
      this.valorInscripcionTotal = 63360;
      this.valorMatriculaAnterior = 3478000;
      this.valorMatriculaActual = 2365000;
    }
  }

  private cargarFallbackJornadas(): void {
    if (this.isProfessional) {
      this.jornadas = 'Diurna, Nocturna y fines de semana';
    } else {
      this.jornadas = 'Diurna, Nocturna y Sábados';
    }
  }
}
