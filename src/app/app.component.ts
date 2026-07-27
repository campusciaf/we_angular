import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ciafweb';

  private routerSub?: Subscription;

  constructor(public router: Router) {}

  ngOnInit(): void {
    // Red de seguridad: el header se destruye por ruta; si el menú móvil quedó abierto,
    // Bootstrap deja overflow:hidden en body y en móvil no se puede hacer scroll.
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.liberarScrollBody());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  onDeactivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    document.body.scrollTop = 0;
    this.liberarScrollBody();
  }

  private liberarScrollBody(): void {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.documentElement.style.removeProperty('overflow');
    document.querySelectorAll('.offcanvas-backdrop').forEach((el) => el.remove());
  }
}
