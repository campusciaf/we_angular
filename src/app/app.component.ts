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
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.liberarScrollBody();
        this.irAlInicio();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  onDeactivate() {
    this.irAlInicio();
    this.liberarScrollBody();
  }

  private irAlInicio(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  private liberarScrollBody(): void {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.documentElement.style.removeProperty('overflow');
    document.querySelectorAll('.offcanvas-backdrop').forEach((el) => el.remove());
  }
}
