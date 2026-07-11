import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { ConectarApiService } from '@/app/core/services/conectar-api.service';
import { forkJoin } from 'rxjs';

interface CiafCounter {
  target: number;
  value: number;
  title: string;
  description: string;
  prefix: string;
  suffix: string;
  icon: string;
  iconType: string;
  animated: boolean;
}

@Component({
  selector: 'app-cifras',
  templateUrl: './cifras.component.html',
  styleUrls: ['./cifras.component.css']
})
export class CifrasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('statsSection', { read: ElementRef })
  statsSection?: ElementRef<HTMLElement>;

  @ViewChild('statsGrid', { read: ElementRef })
  statsGrid?: ElementRef<HTMLElement>;

  @ViewChildren('counterElement', { read: ElementRef })
  counterElements!: QueryList<ElementRef>;

  lineProgress = 0;

  private observer?: IntersectionObserver;
  private viewReady = false;
  private dataReady = false;
  private scrollRafId = 0;
  private cardsRevealDone = false;
  private cardsScrollRaf = 0;
  private readonly boundScrollHandler = () => this.scheduleLineProgressUpdate();
  private readonly boundCardsScrollHandler = () => this.scheduleCardsReveal();

  marqueeItems: string[] = [
    'Futuro',
    'Transformación',
    'Propósito',
    'Financiación',
    'Becas',
    'Créditos',
    'Egresados'
  ];

  counters: CiafCounter[] = [
    {
      target: 0,
      value: 0,
      title: 'Financiación',
      description: 'Más de $21.317 millones invertidos en financiación directa para nuestros universitarios.',
      prefix: '+$',
      suffix: 'M',
      icon: 'fa-solid fa-hand-holding-heart',
      iconType: 'icon-blue',
      animated: false
    },
    {
      target: 6000,
      value: 0,
      title: 'Becas',
      description: 'Más de $6.000 millones en becas y apoyos económicos otorgados.',
      prefix: '+$',
      suffix: 'M',
      icon: 'fa-solid fa-piggy-bank',
      iconType: 'icon-green',
      animated: false
    },
    {
      target: 0,
      value: 0,
      title: 'Créditos',
      description: 'Créditos educativos gestionados para hacer realidad cada sueño profesional.',
      prefix: '+',
      suffix: '',
      icon: 'fa-regular fa-credit-card',
      iconType: 'icon-blue',
      animated: false
    },
    {
      target: 0,
      value: 0,
      title: 'Egresados',
      description: 'Profesionales CIAF transformando el país con propósito.',
      prefix: '+',
      suffix: '',
      icon: 'fa-solid fa-graduation-cap',
      iconType: 'icon-green',
      animated: false
    }
  ];

  constructor(private conectarApiService: ConectarApiService) {}

  ngOnInit(): void {
    forkJoin({
      financiacion: this.conectarApiService.cifras(0),
      creditos: this.conectarApiService.cifras(2),
      egresados: this.conectarApiService.cifras(1)
    }).subscribe({
      next: ({ financiacion, creditos, egresados }) => {
        const numeroFinanciacion = financiacion?.[0]?.total ?? 0;
        const numeroCreditos = creditos?.[0]?.total ?? 0;
        const numeroEgresados = egresados?.total ?? 0;

        this.counters[0].target = this.toMillions(numeroFinanciacion);
        this.counters[2].target = numeroCreditos;
        this.counters[3].target = numeroEgresados;

        this.dataReady = true;
        this.initObserverWhenReady();
      },
      error: (error) => {
        console.error('Error cargando cifras CIAF:', error);
        this.dataReady = true;
        this.initObserverWhenReady();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;

    this.counterElements.changes.subscribe(() => {
      this.initObserverWhenReady();
    });

    this.initObserverWhenReady();
    this.updateLineProgress();
    window.addEventListener('scroll', this.boundScrollHandler, { passive: true });
    window.addEventListener('resize', this.boundScrollHandler, { passive: true });
    // Solo al hacer scroll (no al montar): evita animar antes de llegar a la sección
    window.addEventListener('scroll', this.boundCardsScrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.boundScrollHandler);
    window.removeEventListener('resize', this.boundScrollHandler);
    window.removeEventListener('scroll', this.boundCardsScrollHandler);

    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
    }

    if (this.cardsScrollRaf) {
      cancelAnimationFrame(this.cardsScrollRaf);
    }
  }

  private scheduleLineProgressUpdate(): void {
    if (this.scrollRafId) {
      return;
    }

    this.scrollRafId = requestAnimationFrame(() => {
      this.scrollRafId = 0;
      this.updateLineProgress();
    });
  }

  private updateLineProgress(): void {
    const section = this.statsSection?.nativeElement;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = rect.height;

    if (sectionHeight <= 0) {
      return;
    }

    const raw = (viewportHeight - rect.top) / (viewportHeight + sectionHeight);
    const next = Math.max(0, Math.min(100, raw * 100));

    if (Math.abs(this.lineProgress - next) > 0.05) {
      this.lineProgress = next;
    }
  }

  private scheduleCardsReveal(): void {
    if (this.cardsRevealDone || this.cardsScrollRaf) {
      return;
    }

    this.cardsScrollRaf = requestAnimationFrame(() => {
      this.cardsScrollRaf = 0;
      this.revelarCardsSiCorresponde();
    });
  }

  private revelarCardsSiCorresponde(): void {
    if (this.cardsRevealDone) {
      return;
    }

    const section = this.statsSection?.nativeElement;
    const grid = this.statsGrid?.nativeElement;

    if (!section || !grid) {
      return;
    }

    // Sin scroll real aún: no animar (evita el falso positivo al cargar inicio)
    if (window.scrollY < 24) {
      return;
    }

    const rect = grid.getBoundingClientRect();
    const vh = window.innerHeight;

    // Las cards deben estar entrando al viewport por scroll
    const entrando =
      rect.top < vh * 0.72 &&
      rect.bottom > vh * 0.28 &&
      rect.top > -rect.height * 0.4;

    if (!entrando) {
      return;
    }

    this.cardsRevealDone = true;
    section.classList.add('ciaf-stats--in');
    window.removeEventListener('scroll', this.boundCardsScrollHandler);
  }

  private initObserverWhenReady(): void {
    if (!this.viewReady || !this.dataReady || !this.counterElements?.length) {
      return;
    }

    this.observer?.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = this.counterElements
          .toArray()
          .findIndex((el) => el.nativeElement === entry.target);

        if (index !== -1 && this.counters[index] && !this.counters[index].animated) {
          this.counters[index].animated = true;
          this.animateCounter(this.counters[index]);
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    this.counterElements.forEach((element) => {
      this.observer?.observe(element.nativeElement);
    });
  }

  private animateCounter(counter: CiafCounter): void {
    const duration = 1300;
    const startTime = performance.now();
    const target = counter.target;

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      counter.value = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.value = target;
      }
    };

    requestAnimationFrame(step);
  }

  private toMillions(value: number): number {
    if (!value) return 0;
    return value >= 1000000 ? Math.round(value / 1000000) : value;
  }
}