import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-ing-software',
  templateUrl: './ing-software.component.html',
  styleUrls: ['./ing-software.component.css']
})
export class IngSoftwareComponent implements OnInit {



public ingenieria_sotfware="assets/image/ingenieria-de-software.webp";
public sotfware_pic="assets/image/software-pic.webp";
public img_li="assets/image/img-li.webp";
public niveles_software="assets/image/niveles-software.webp";
public next="assets/image/btn-next.webp";
public prev="assets/image/btn-prev.webp";
public descargar="assets/image/descargar.webp";
public desplegar="assets/image/desplegar.webp";
public inscribete_en_linea="assets/image/inscribete-en-linea.webp";
public te_asesoro="assets/image/te-asesoro.webp";
public llamame="assets/image/llamame.webp";
public visita_sede="assets/image/visita-sede.webp";

public banner_financiacion="assets/image/banner-financiacion.webp";


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
 


  constructor() {


   }

  ngOnInit(): void {

   this.activo="1";
   this.pagina="1";
   this.paginas(this.pagina);

  }







  
}



