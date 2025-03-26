import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cifras',
  templateUrl: './cifras.component.html',
  styleUrls: ['./cifras.component.css']
})
export class CifrasComponent implements OnInit, AfterViewInit {
  counters = [
    { target: 5000, value: 0 },
    { target: 1000, value: 0 },
    { target: 8000, value: 0 }
  ];

  @ViewChildren('counter', { read: ElementRef }) counterElements!: QueryList<ElementRef>;

  ngOnInit() {}

  ngAfterViewInit() {
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
      const increment = target / 200; // Ajusta este valor para cambiar la velocidad

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