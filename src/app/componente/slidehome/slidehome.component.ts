import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';

@Component({
  selector: 'app-slidehome',
  templateUrl: './slidehome.component.html',
  styleUrls: ['./slidehome.component.css']
})
export class SlidehomeComponent implements OnInit {
  listarSlider:any;

  contador = {
    numero:[0,1,2,3,4,5,6,7,8,9,10],
  }
  constructor(
    private conectarApiService:ConectarApiService,
  ) { }

  ngOnInit(): void {

    this.conectarApiService.obtenerSlide().subscribe(respuesta=>{
      this.listarSlider=respuesta
    });
    

  }

}
