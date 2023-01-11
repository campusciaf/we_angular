import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CargarjsService } from 'src/app/servicios/cargarjs.service';


declare var jQuery:any;
declare var $:any;

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


  constructor(private _CargarJsService:CargarjsService,) {

   }
  ngOnInit() {




  }
}
