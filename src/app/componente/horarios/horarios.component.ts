import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})

export class HorariosComponent {


  constructor(private conectarApiService:ConectarApiService,private sanitizer: DomSanitizer,) { }

  listarHorario: any;
  ngOnInit(): void {



    this.conectarApiService.obtenerHorario().subscribe(respuesta=>{
      this.listarHorario=respuesta
    }); 

    

   
  }

}

