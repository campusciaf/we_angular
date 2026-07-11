import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/**
 * Entrada en cascada al hacer scroll (no al cargar).
 * Uso: <div ciafStagger=".ciaf-offer-card" ciafStaggerMode="up">
 */
@Directive({
  selector: '[ciafStagger]',
})
export class CiafStaggerDirective implements AfterViewInit, OnDestroy {
  /** Selector de items dentro del host */
  @Input('ciafStagger') itemSelector = 'article';

  /** soft = como cifras; up = desde más abajo */
  @Input() ciafStaggerMode: 'soft' | 'up' = 'soft';

  private done = false;
  private raf = 0;
  private readonly onScroll = () => this.schedule();

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    el.classList.add('ciaf-stagger');
    el.classList.add(
      this.ciafStaggerMode === 'up' ? 'ciaf-stagger--up' : 'ciaf-stagger--soft'
    );

    setTimeout(() => this.prepareItems(), 0);
    setTimeout(() => {
      this.prepareItems();
      if (window.scrollY >= 24) {
        this.tryReveal();
      }
    }, 500);

    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);

    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
  }

  private prepareItems(): void {
    const items = this.host.nativeElement.querySelectorAll(this.itemSelector);

    items.forEach((item, index) => {
      const node = item as HTMLElement;
      node.classList.add('ciaf-stagger-item');
      node.style.setProperty('--i', String(index));
    });
  }

  private schedule(): void {
    if (this.done || this.raf) {
      return;
    }

    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.tryReveal();
    });
  }

  private tryReveal(): void {
    if (this.done) {
      return;
    }

    // Evita falso positivo al cargar inicio (hero sin altura aún)
    if (window.scrollY < 24) {
      return;
    }

    this.prepareItems();

    const rect = this.host.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight;

    const entrando =
      rect.top < vh * 0.72 &&
      rect.bottom > vh * 0.28 &&
      rect.top > -rect.height * 0.4;

    if (!entrando) {
      return;
    }

    this.done = true;
    this.host.nativeElement.classList.add('ciaf-stagger--in');
    window.removeEventListener('scroll', this.onScroll);
  }
}
