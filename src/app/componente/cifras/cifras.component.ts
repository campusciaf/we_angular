import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-cifras',
  templateUrl: './cifras.component.html',
  styleUrls: ['./cifras.component.css']
})
export class CifrasComponent implements OnInit, AfterViewInit {

  counters: { target: number; value: number }[] = [
    { target: 0, value: 0 },
    { target: 0, value: 0 },
    { target: 0, value: 0 },
    { target: 0, value: 0 } // Aseguramos al menos 4 elementos
  ];




  @ViewChildren('counter', { read: ElementRef }) counterElements!: QueryList<ElementRef>;
  
  verificarNumeroEgresado: number | null = null;

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit() {

    this.counters = [
      { target: 15000000000, value: 0 },
      { target: 6000000000, value: 0 },
      { target: 0, value: 0 },
      { target: 0, value: 0 } // Inicializamos con 0
    ];



  // Llamar a ambas APIs en paralelo
  forkJoin({
    creditos: this.conectarApiService.cifras(2),
    egresados: this.conectarApiService.cifras(1)
  }).subscribe(({ creditos, egresados }) => {

    const numeroCreditos = creditos[0]?.total ?? 0;
    const numeroEgresados = egresados.total ?? 0;

    // Actualizar los valores en la lista de contadores
    if (numeroCreditos > 0) {
      this.counters[2].target = numeroCreditos; // Se asume que el índice 2 es para créditos
    }

    if (numeroEgresados > 0) {
      this.counters[3].target = numeroEgresados; // Se asume que el índice 3 es para egresados
    }


    // Iniciar animación después de que ambos valores se hayan actualizado
    setTimeout(() => {
      this.startAnimation();
    }, 100);
  });


    

    
    
    
  }

  ngAfterViewInit() {
    // Si los datos ya fueron cargados, inicia la animación
    if (this.verificarNumeroEgresado !== null) {
      this.startAnimation();
    }
  }

  startAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetValue = entry.target.getAttribute('data-target');
          if (targetValue) {
            const counter = this.counters.find(c => c.target === +targetValue);
            if (counter) {
              this.animateCounter(counter);
              observer.unobserve(entry.target);
            }
          }
        }
      });
    }, { threshold: 0.1 });

    this.counterElements.forEach(counterElement => {
      observer.observe(counterElement.nativeElement);
    });
  }

  animateCounter(counter: { target: number; value: number; }) {
    const updateCounter = () => {
      const target = counter.target;
      const count = counter.value;
      const increment = target / 200;

      if (count < target) {
        counter.value = Math.ceil(count + increment);
        setTimeout(updateCounter, 10);
      } else {
        counter.value = target;
      }
    };

    updateCounter();
  }
}
