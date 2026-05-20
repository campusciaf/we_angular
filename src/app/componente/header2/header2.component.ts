import { Component } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {

  mobileMenuOpen = false;
  ofertaOpen = false;

  abrirMenu(): void {
    this.mobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarMenu(): void {
    this.mobileMenuOpen = false;
    this.ofertaOpen = false;
    document.body.style.overflow = '';
  }

  toggleOferta(): void {
    this.ofertaOpen = !this.ofertaOpen;
  }

}