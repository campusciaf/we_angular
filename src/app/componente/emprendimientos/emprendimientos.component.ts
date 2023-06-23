import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-emprendimientos',
  templateUrl: './emprendimientos.component.html',
  styleUrls: ['./emprendimientos.component.css']
})
export class EmprendimientosComponent {

  public banner_pc="assets/image/emprendimientos_pc.webp";
  public banner_movil="assets/image/emprendimientos_movil.webp";
  public logo="assets/image/logo-hub-venture.webp";
  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";



  listarEmprendimientos:any;
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
    this.conectarApiService.obtenerEmprendimientos().subscribe(respuesta=>{
      this.listarEmprendimientos=respuesta
    });
    
    this.activarLinkMenu();
  }
}
