import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-calidadycrecimiento',
  templateUrl: './calidadycrecimiento.component.html',
  styleUrls: ['./calidadycrecimiento.component.css']
})

export class CalidadycrecimientoComponent implements OnInit {

  public prev="assets/image/btn-prev-3.webp";
  public next="assets/image/btn-next-3.webp";

  public pic1="assets/image/sistema-aseguramiento-calidad.webp";
  public pic2="assets/image/investigaciones.webp";
  public pic3="assets/image/relacionamiento-empresarial.webp";
  public pic4="assets/image/egresados.webp";
  public pic5="assets/image/rendicion-de-cuentas.webp";

  slides = [
    {imagen:this.pic1,titulo:'Sistema de Aseguramiento de la Calidad'},
    {imagen:this.pic2,titulo:'Investigaciones e Internacionalización'},
    {imagen:this.pic3,titulo:'Relacionamiento Empresarial'},
    {imagen:this.pic4,titulo:'Egresados'},
    {imagen:this.pic5,titulo:'Rendición de cuentas'}
  ];
  slideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
    responsive: [
      {
        breakpoint: 1048,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 778,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  
  };
  
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;
  prevImg(){
    this.slickModal.slickPrev();
  }
  nextImg(){
    this.slickModal.slickNext();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
