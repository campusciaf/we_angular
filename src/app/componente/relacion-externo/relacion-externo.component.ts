import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-relacion-externo',
  templateUrl: './relacion-externo.component.html',
  styleUrls: ['./relacion-externo.component.css']
})
export class RelacionExternoComponent {
  public logo_pc="assets/image/relacion-externa-pc.webp";
  public logo_m="assets/image/relacion-externa-m.webp";
  public la_u_colegio="assets/image/la-u-colegio.webp";
  public mujeres="assets/image/mujeres-transforman.webp";
  public conversatorio="assets/image/conversatorio.webp";



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
