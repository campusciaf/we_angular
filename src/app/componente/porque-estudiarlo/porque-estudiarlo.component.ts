import { Component, Input, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-porque-estudiarlo',
  templateUrl: './porque-estudiarlo.component.html',
  styleUrls: ['./porque-estudiarlo.component.css']
})
export class PorqueEstudiarloComponent implements OnInit {
  @Input() programId!: number;
  @Input() isProfessional: boolean = true;

  titulo: string = '';
  subtitulo: string = '';
  items: any[] = [];

  // Fallbacks profesionales
  fallbackProfesionalTitulo = 'Las empresas necesitan líderes capaces de adaptarse, innovar y [[tomar decisiones]].';
  fallbackProfesionalItems = [
    {
      titulo: 'Estrategia empresarial',
      descripcion: 'Diseña planes que llevan a las organizaciones al siguiente nivel.',
      icono: 'fa-solid fa-arrow-trend-up',
      tema: 'azul'
    },
    {
      titulo: 'Innovación y emprendimiento',
      descripcion: 'Convierte ideas en soluciones, proyectos y oportunidades reales.',
      icono: 'fa-solid fa-lightbulb',
      tema: 'verde'
    },
    {
      titulo: 'Liderazgo y gestión de equipos',
      descripcion: 'Desarrolla habilidades para dirigir personas, procesos y resultados.',
      icono: 'fa-solid fa-users',
      tema: 'celeste'
    },
    {
      titulo: 'Negocios y transformación digital',
      descripcion: 'Entiende los nuevos modelos de negocio impulsados por la tecnología.',
      icono: 'fa-solid fa-earth-americas',
      tema: 'azul'
    },
    {
      titulo: 'Análisis financiero',
      descripcion: 'Toma decisiones con datos, indicadores y visión estratégica.',
      icono: 'fa-solid fa-chart-column',
      tema: 'verde'
    },
    {
      titulo: 'Creación de nuevos proyectos',
      descripcion: 'Aprende a estructurar iniciativas sostenibles, viables y escalables.',
      icono: 'fa-solid fa-rocket',
      tema: 'celeste'
    }
  ];

  // Fallback Contaduría (ID 3)
  fallbackContaduriaTitulo = 'Las organizaciones necesitan profesionales capaces de generar confianza, interpretar la información financiera [[y tomar decisiones estratégicas]].';

  // Fallback Técnicos (6, 7, 8, 10)
  fallbackTecnicoTitulo = 'El sector salud necesita personas capaces de cuidar, atender y [[salvar vidas]].';
  fallbackTecnicoItems = [
    {
      titulo: 'Cuidado humano',
      descripcion: 'Acompaña y cuida a los pacientes con vocación y calidez.',
      icono: 'fa-solid fa-arrow-trend-up',
      tema: 'azul'
    },
    {
      titulo: 'Alta empleabilidad',
      descripcion: 'El sector salud demanda constantemente personal capacitado.',
      icono: 'fa-solid fa-lightbulb',
      tema: 'verde'
    },
    {
      titulo: 'Atención al paciente',
      descripcion: 'Apoya procedimientos clínicos y la administración de medicamentos.',
      icono: 'fa-solid fa-users',
      tema: 'celeste'
    },
    {
      titulo: 'Vocación de servicio',
      descripcion: 'Genera un impacto real en la vida y bienestar de las personas.',
      icono: 'fa-solid fa-earth-americas',
      tema: 'azul'
    },
    {
      titulo: 'Formación práctica',
      descripcion: 'Aprende haciendo en laboratorios y escenarios clínicos reales.',
      icono: 'fa-solid fa-chart-column',
      tema: 'verde'
    },
    {
      titulo: 'Bioseguridad',
      descripcion: 'Domina los protocolos para una atención segura y responsable.',
      icono: 'fa-solid fa-rocket',
      tema: 'celeste'
    }
  ];

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    if (this.programId) {
      this.conectarApiService.obtenerProgramaId(this.programId).subscribe({
        next: (respuesta: any) => {
          if (respuesta && respuesta.porque_estudiarlo) {
            this.titulo = respuesta.porque_estudiarlo.titulo;
            this.subtitulo = respuesta.porque_estudiarlo.subtitulo || '';
            this.items = respuesta.porque_estudiarlo_items || [];
          } else {
            this.cargarFallback();
          }
        },
        error: (err) => {
          console.error('Error al cargar porque-estudiarlo:', err);
          this.cargarFallback();
        }
      });
    } else {
      this.cargarFallback();
    }
  }

  private cargarFallback(): void {
    if (this.isProfessional) {
      this.titulo = this.programId === 3 ? this.fallbackContaduriaTitulo : this.fallbackProfesionalTitulo;
      this.items = this.fallbackProfesionalItems;
    } else {
      this.titulo = this.fallbackTecnicoTitulo;
      this.items = this.fallbackTecnicoItems;
    }
    this.subtitulo = '';
  }
}
