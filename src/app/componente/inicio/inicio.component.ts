import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  creatividadPic: Array<any> = [
    { imagen: 'assets/image/emprendimientos.webp', titulo: 'Vitrina de Emprendimientos', link: '/emprendimientos', tipolink: '1' },
    { imagen: 'assets/image/pereira4ri.webp', titulo: 'Pereira 4RI ', link: 'https://pereira4ri.com/', tipolink: '2' },
    { imagen: 'assets/image/hub.webp', titulo: 'HUB de la Creatividad', link: '', tipolink: '1' },
    { imagen: 'assets/image/memorias-institucionales.webp', titulo: 'Memorias Institucionales', link: 'https://heyzine.com/flip-book/97549097a8.html', tipolink: '2' }
  ];

  activarLinkMenu(): void {
    $('#uno').removeClass('active-link-dropdow');
    $('#dos').removeClass('active-link-dropdow');
  }

  ngOnInit(): void {
    this.activarLinkMenu();
  }
}
