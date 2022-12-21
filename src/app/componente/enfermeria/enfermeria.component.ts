import { Component, OnInit } from '@angular/core';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css']
})
export class EnfermeriaComponent implements OnInit {
  public banner_pc="assets/image/auxiliar-en-enfermeria.webp";
  public banner_movil="assets/image/auxiliar-en-enfermeria-movil.webp";

  pagina:any;
  activo:any;
  paginas(pagina:string){
  
    if(pagina == "1"){
      $("#pag-one").show();
      $("#pag-two").hide();
      $("#pag-three").hide();
      $("#pag-four").hide();
   }
  
   if(pagina == "2"){
    $("#pag-one").hide();
    $("#pag-two").show();
    $("#pag-three").hide();
    $("#pag-four").hide();
  }
  
  if(pagina == "3"){
    $("#pag-one").hide();
    $("#pag-two").hide();
    $("#pag-three").show();
    $("#pag-four").hide();
  }
  
  if(pagina == "4"){
    $("#pag-one").hide();
    $("#pag-two").hide();
    $("#pag-three").hide();
    $("#pag-four").show();
  }
}



  constructor() { }

  ngOnInit(): void {
  }

}
