import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-continuada',
  templateUrl: './continuada.component.html',
  styleUrls: ['./continuada.component.css']
})
export class ContinuadaComponent implements OnInit {

  public educacion_continuada="assets/image/educacion-continuada.webp";
  public educacion_continuada_movil="assets/image/educacion-continuada-movil.webp";
  public logo_continuada="assets/image/logo-continuada.webp";
  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";



  listarCursos:any;
  miCurso:any;
  

  activarLinkMenu(){
    $("#uno").removeClass("active-link-dropdow");
    $("#dos").removeClass("active-link-dropdow");
  }

  constructor(private conectarApiService:ConectarApiService) {}
    consultar(id:number){
    console.log(id);
   }

  ngOnInit(): void {
    this.conectarApiService.obtenerContinuada().subscribe(respuesta=>{
      this.listarCursos=respuesta
    });
    
    this.activarLinkMenu();

    
  }


  

}
