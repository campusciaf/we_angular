import { Component, Input, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {
  @Input() programId!: number;
  @Input() programName: string = '';
  @Input() customTitle: string = '';

  experiencias: any[] = [];

  // Fallbacks por programa
  fallbacks: { [key: number]: any[] } = {
    1: [
      {
        url_video: 'https://www.youtube.com/watch?v=gc4Ef5xf_30',
        imagen_portada: 'https://img.youtube.com/vi/gc4Ef5xf_30/hqdefault.jpg',
        titulo: 'Estudia Admin de empresas'
      },
      {
        url_video: 'https://www.youtube.com/shorts/uWeDCygMGpw?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/uWeDCygMGpw/hqdefault.jpg',
        titulo: 'Historias de nuestros estudiantes'
      },
      {
        url_video: 'https://www.youtube.com/shorts/04uG_znhY_c?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/04uG_znhY_c/hqdefault.jpg',
        titulo: 'Emprendimiento y liderazgo'
      }
    ],
    2: [
      {
        url_video: 'https://www.youtube.com/shorts/IS6uA04Dxb0',
        imagen_portada: 'https://img.youtube.com/vi/IS6uA04Dxb0/hqdefault.jpg',
        titulo: 'Herramientas que debes conocer'
      },
      {
        url_video: 'https://youtube.com/shorts/AzRjIK2n7H8?si=aYy0R6MJOuOI_Qu4',
        imagen_portada: 'https://img.youtube.com/vi/AzRjIK2n7H8/hqdefault.jpg',
        titulo: 'Software no es solo para genios'
      },
      {
        url_video: 'https://www.youtube.com/watch?v=OeTk94_mljg',
        imagen_portada: 'https://img.youtube.com/vi/OeTk94_mljg/hqdefault.jpg',
        titulo: 'Historias de nuestros estudiantes'
      }
    ],
    3: [
      {
        url_video: 'https://www.youtube.com/watch?v=YZ-3bt4kp1o&time_continue=3&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fciaf.edu.co%2F',
        imagen_portada: 'https://img.youtube.com/vi/YZ-3bt4kp1o/hqdefault.jpg',
        titulo: 'Estudia Contaduría'
      },
      {
        url_video: 'https://www.youtube.com/shorts/W0NmcpjD37g?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/W0NmcpjD37g/hqdefault.jpg',
        titulo: 'Historias de nuestros estudiantes'
      },
      {
        url_video: 'https://www.youtube.com/shorts/vhXtq9eqrnM?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/vhXtq9eqrnM/hqdefault.jpg',
        titulo: 'El plástico no es basura'
      }
    ],
    4: [
      {
        url_video: 'https://www.youtube.com/shorts/0r4PLOdA6jg',
        imagen_portada: 'https://img.youtube.com/vi/0r4PLOdA6jg/hqdefault.jpg',
        titulo: 'Estudia SST'
      },
      {
        url_video: 'https://www.youtube.com/shorts/l5wZ21ILnGI?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/l5wZ21ILnGI/hqdefault.jpg',
        titulo: 'Práctica académica SST'
      },
      {
        url_video: 'https://www.youtube.com/watch?v=zJPeSkX0BbY',
        imagen_portada: 'https://img.youtube.com/vi/zJPeSkX0BbY/hqdefault.jpg',
        titulo: 'Emprendimiento y liderazgo'
      }
    ],
    5: [
      {
        url_video: 'https://www.youtube.com/shorts/knbuP17rHTs?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/knbuP17rHTs/hqdefault.jpg',
        titulo: 'Estudia Ingeniería Industrial'
      },
      {
        url_video: 'https://www.youtube.com/shorts/widcuwxBIe8?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/widcuwxBIe8/hqdefault.jpg',
        titulo: 'Experiencias Académicas CIAF'
      },
      {
        url_video: 'https://www.youtube.com/shorts/iCdHCw7w-d0?feature=share',
        imagen_portada: 'https://img.youtube.com/vi/iCdHCw7w-d0/hqdefault.jpg',
        titulo: 'Visita a Suzuki ¡Muy Top!'
      }
    ]
  };

  // Fallback genérico para técnicos (6, 7, 8, 10)
  fallbackTecnicos = [
    {
      url_video: 'https://www.youtube.com/watch?v=gc4Ef5xf_30',
      imagen_portada: 'https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg',
      titulo: 'Vive la experiencia CIAF'
    },
    {
      url_video: 'https://www.youtube.com/shorts/uWeDCygMGpw?feature=share',
      imagen_portada: 'https://img.youtube.com/vi/Ye8mB69B23A/hqdefault.jpg',
      titulo: 'Historias de nuestros estudiantes'
    },
    {
      url_video: 'https://www.youtube.com/shorts/04uG_znhY_c?feature=share',
      imagen_portada: 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
      titulo: 'Emprendimiento y liderazgo'
    }
  ];

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    if (this.programId) {
      this.conectarApiService.obtenerProgramaId(this.programId).subscribe({
        next: (respuesta: any) => {
          if (respuesta && respuesta.experiencias && respuesta.experiencias.length > 0) {
            this.experiencias = respuesta.experiencias;
          } else {
            this.cargarFallback();
          }
        },
        error: (err) => {
          console.error('Error al cargar experiencias:', err);
          this.cargarFallback();
        }
      });
    } else {
      this.cargarFallback();
    }
  }

  private cargarFallback(): void {
    this.experiencias = this.fallbacks[this.programId] || this.fallbackTecnicos;
  }
}
