import { Component, OnInit } from '@angular/core';
import { CargarjsService } from 'src/app/servicios/cargarjs.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-bienestar',
  templateUrl: './bienestar.component.html',
  styleUrls: ['./bienestar.component.css']
})
export class BienestarComponent implements OnInit {

  public pic1="assets/image/cultura.webp";
  public pic2="assets/image/desarrollo-humano.webp";
  public pic3="assets/image/salud.webp";
  public pic4="assets/image/promocion.webp";
  public pic5="assets/image/deportes.webp";
  public pic6="assets/image/graduacion.webp";

  imagenesExperiencias:Array<any> =[

    {imagen:this.pic1,titulo:'Cultura'},
    {imagen:this.pic2,titulo:'Desarrollo Humano'},
    {imagen:this.pic3,titulo:'Salud'},
    {imagen:this.pic4,titulo:'Promoción Socioeconómica'},
    {imagen:this.pic5,titulo:'Deportes'},
    {imagen:this.pic6,titulo:'Éxito Estudiantil Meta: Graduación'}

  ]


public bienestar="assets/image/bienestar.webp";
public parche="assets/image/sumate-al-parche.webp";
public quedate="assets/image/quedate.webp";
public inspiradores="assets/image/inspiradores.webp";
public sotfware_pic="assets/image/software-pic.webp";
public img_li="assets/image/img-li.webp";
public niveles_software="assets/image/niveles-software.webp";
public next="assets/image/btn-next.webp";
public prev="assets/image/btn-prev.webp";


public banner_financiacion="assets/image/banner-financiacion.webp";


pagina:any;
activo:any;
paginas(pagina:string){

if(pagina == "0"){
  $("#pag-ini").show();
  $("#pag-one").hide();
  $("#pag-two").hide();
  $("#pag-three").hide();
  $("#pag-four").hide();
}

if(pagina == "1"){
  $("#pag-ini").hide();
  $("#pag-one").show();
  $("#pag-two").hide();
  $("#pag-three").hide();
  $("#pag-four").hide();
}

 if(pagina == "2"){
  $("#pag-ini").hide();
  $("#pag-one").hide();
  $("#pag-two").show();
  $("#pag-three").hide();
  $("#pag-four").hide();
}

if(pagina == "3"){
  $("#pag-ini").hide();
  $("#pag-one").hide();
  $("#pag-two").hide();
  $("#pag-three").show();
  $("#pag-four").hide();
}

if(pagina == "4"){
  $("#pag-ini").hide();
  $("#pag-one").hide();
  $("#pag-two").hide();
  $("#pag-three").hide();
  $("#pag-four").show();
}


 
}


  constructor(private _CargarJsService:CargarjsService) { 
    this._CargarJsService.Cargarjs(["slick.min"]);
    this._CargarJsService.Cargarjs(["calidad"]);
  }

  ngOnInit(): void {
    this.activo="0";
    this.pagina="0";
    this.paginas(this.pagina);
  }

}
