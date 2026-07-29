import { Component, Input, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-conoce-programa',
  templateUrl: './conoce-programa.component.html',
  styleUrls: ['./conoce-programa.component.css'],
})
export class ConoceProgramaComponent implements OnInit {
  @Input() programId!: number;
  @Input() programName: string = '';
  @Input() isProfessional: boolean = true;
  @Input() customTitle: string = '';

  conocePrograma: any = null;
  perfilProfesional: any[] = [];
  perfilOcupacional: any[] = [];

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    if (this.programId) {
      this.conectarApiService.obtenerProgramaId(this.programId).subscribe({
        next: (respuesta: any) => {
          if (respuesta) {
            if (respuesta.estado) {
              this.conocePrograma = respuesta.conoce;
              this.perfilProfesional = respuesta.perfil_profesional || [];
              this.perfilOcupacional = respuesta.perfil_ocupacional || [];
            } else if (respuesta.conoce) {
              this.conocePrograma = respuesta.conoce;
              this.perfilProfesional = respuesta.perfil_profesional || [];
              this.perfilOcupacional = respuesta.perfil_ocupacional || [];
            } else {
              // Fallback en caso de que la respuesta sea un arreglo o estructura antigua
              const data = Array.isArray(respuesta) ? respuesta[0] : respuesta;
              this.conocePrograma = data?.conoce || null;
              this.perfilProfesional = data?.perfil_profesional || [];
              this.perfilOcupacional = data?.perfil_ocupacional || [];
            }
            console.log(this.conocePrograma);
            console.log(this.perfilProfesional);
            console.log(this.perfilOcupacional);
          }
        },
        error: (err) => {
          console.error('Error al cargar conoce-programa:', err);
        },
      });
    }
  }
}
