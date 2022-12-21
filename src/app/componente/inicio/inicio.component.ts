import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  creatividadPic:Array<any> =[

    {imagen:'assets/image/emprendimientos.webp',titulo:'Vitrina de Emprendimientos'},
    {imagen:'assets/image/pereira4ri.webp',titulo:'Pereira 4RI '},
    {imagen:'assets/image/hub.webp',titulo:'HUB de la Creatividad'},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'Memorias Institucionales'},


  ]
  constructor() { }

  ngOnInit(): void {

 
  }




}
