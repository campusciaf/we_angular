import { Component, Input, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-campo-accion',
  templateUrl: './campo-accion.component.html',
  styleUrls: ['./campo-accion.component.css'],
})
export class CampoAccionComponent implements OnInit {
  @Input() programId!: number;
  @Input() isProfessional: boolean = true;

  campoAccion: any[] = [];
  campoAccionActivo: string | null = null;

  fallbackProfesional = [
    {
      titulo: 'Por definir',
      descripcion: 'Por definir 1',
    },
  ];

  fallbackTecnico = [
    {
      titulo: 'Por definir',
      descripcion: 'Por definir 2',
    },
  ];

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    if (this.programId) {
      this.conectarApiService.obtenerProgramaId(this.programId).subscribe({
        next: (respuesta: any) => {
          if (
            respuesta &&
            respuesta.campo_accion &&
            respuesta.campo_accion.length > 0
          ) {
            this.campoAccion = respuesta.campo_accion;
          } else {
            this.campoAccion = this.isProfessional
              ? this.fallbackProfesional
              : this.fallbackTecnico;
          }
        },
        error: (err) => {
          console.error('Error al cargar campo-accion:', err);
          this.campoAccion = this.isProfessional
            ? this.fallbackProfesional
            : this.fallbackTecnico;
        },
      });
    } else {
      this.campoAccion = this.isProfessional
        ? this.fallbackProfesional
        : this.fallbackTecnico;
    }
  }

  toggleCampoAccion(id: string): void {
    this.campoAccionActivo = this.campoAccionActivo === id ? null : id;
  }
}
