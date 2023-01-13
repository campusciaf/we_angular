import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-continuada-detalle',
  templateUrl: './continuada-detalle.component.html',
  styleUrls: ['./continuada-detalle.component.css']
})
export class ContinuadaDetalleComponent implements OnInit {
  public educacion_continuada="assets/image/educacion-continuada.webp";
  public logo_continuada="assets/image/logo-continuada.webp";
  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";
  public prev="assets/image/btn-prev.webp";
  
// produccion//
API: string='https://ciaf.edu.co/api_rest';
detalleCurso:any;

//local//
// API: string='http://localhost/web-angular/api_rest';
autorizacion = 'KFTDQFYvqbPLXkHTuXQJR4Qy3vUryK';

  constructor(
    private conectarApiService:ConectarApiService,
    private  _route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    var id:number = +this._route.snapshot.paramMap.getAll('id');
 

    this.conectarApiService.obtenerContinuadaId(id).subscribe(respuesta=>{
      this.detalleCurso=respuesta
    }); 
    


  }


}
