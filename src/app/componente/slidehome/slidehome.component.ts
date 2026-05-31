import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-slidehome',
  templateUrl: './slidehome.component.html',
  styleUrls: ['./slidehome.component.css']
})
export class SlidehomeComponent implements OnInit {

  listarSlider: any[] = [];
  activeSlide = 0;

  urlBanner = 'https://ciaf.digital/public/web_baner/';

  constructor(
    private conectarApiService: ConectarApiService,
  ) {}

  ngOnInit(): void {
    this.conectarApiService.obtenerSlide().subscribe({
      next: (respuesta: any) => {
        this.listarSlider = Array.isArray(respuesta) ? respuesta : [];
      },
      error: (error) => {
        console.error('Error cargando slider:', error);
        this.listarSlider = [];
      }
    });
  }

  onSlide(event: NgbSlideEvent): void {
    const id = event.current?.replace('slide-', '');
    this.activeSlide = Number(id || 0);
  }

  getTituloPartes(titulo: string): { texto: string; resaltada: boolean }[] {
    if (!titulo) return [];
  
    const palabrasResaltadas = ['paga', 'después', 'transformas', 'digital', 'futuro'];
  
    return titulo.split(' ').map((palabra: string) => {
      const limpia = palabra.toLowerCase().replace(/[.,;:!¡¿?]/g, '');
  
      return {
        texto: palabra + ' ',
        resaltada: palabrasResaltadas.includes(limpia)
      };
    });
  }
}