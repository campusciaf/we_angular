import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {



public banner_pc="assets/image/ingenieria-de-software.webp";
public banner_movil="assets/image/ingenieria-de-software-movil.webp";
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
public beneficios="assets/image/beneficios.webp";


listarSemestres1 = [
  {semestre:1},
  {semestre:2},
  {semestre:3},
  {semestre:4},
];

listarSemestres2 = [
  {semestre:5},
  {semestre:6},
  {semestre:7},
];

listarSemestres3 = [
  {semestre:8},
  {semestre:9},
  {semestre:10},

];

listarMaterias =[
  {semestre:1,materia:'Matemáticas I'},
  {semestre:1,materia:'Proyecto de vida'},
  {semestre:1,materia:'Teoría del conocimiento'},
  {semestre:1,materia:'Lógica de programación'},
  {semestre:1,materia:'Introducción a la informática'},
  {semestre:1,materia:'Introducción a la Ingeniería de Software'},

  {semestre:2,materia:'Matemáticas II'},
  {semestre:2,materia:'Programación II'},
  {semestre:2,materia:'Lecto-escritura'},
  {semestre:2,materia:'Diseño WEB'},
  {semestre:2,materia:'Metodología de la Investigación'},
  {semestre:2,materia:'Pensamiento empresarial tendencias de emprendimiento'},

  {semestre:3,materia:'Fisica I'},
  {semestre:3,materia:'Estructura de datos'},
  {semestre:3,materia:'Programación III'},
  {semestre:3,materia:'Plan de negocios'},
  {semestre:3,materia:'Herramientas multiplataformas redes I'},
  {semestre:3,materia:'Cálculo multivariado'},

  {semestre:4,materia:'Legislación'},
  {semestre:4,materia:'Trabajo de grado'},
  {semestre:4,materia:'Bases de datos I'},
  {semestre:4,materia:'Algebra lineal'},
  {semestre:4,materia:'Programación y servicios WEB'},
  {semestre:4,materia:'Principios de la Ingeniería de Software'},

  {semestre:5,materia:'Matemáticas I'},
  {semestre:5,materia:'Proyecto de vida'},
  {semestre:5,materia:'Teoría del conocimiento'},
  {semestre:5,materia:'Lógica de programación'},
  {semestre:5,materia:'Introducción a la informática'},
  {semestre:5,materia:'Introducción a la Ingeniería de Software'},

  {semestre:6,materia:'Matemáticas II'},
  {semestre:6,materia:'Programación II'},
  {semestre:6,materia:'Lecto-escritura'},
  {semestre:6,materia:'Diseño WEB'},
  {semestre:6,materia:'Metodología de la Investigación'},
  {semestre:6,materia:'Pensamiento empresarial tendencias de emprendimiento'},

  {semestre:7,materia:'Fisica I'},
  {semestre:7,materia:'Estructura de datos'},
  {semestre:7,materia:'Programación III'},
  {semestre:7,materia:'Plan de negocios'},
  {semestre:7,materia:'Herramientas multiplataformas redes I'},
  {semestre:7,materia:'Cálculo multivariado'},

  {semestre:8,materia:'Cálculo multivariado'},
  {semestre:8,materia:'Cálculo multivariado'},
  {semestre:8,materia:'Cálculo multivariado'},
  {semestre:8,materia:'Cálculo multivariado'},
  {semestre:8,materia:'Cálculo multivariado'},
  {semestre:8,materia:'Cálculo multivariado'},

  {semestre:9,materia:'Cálculo multivariado'},
  {semestre:9,materia:'Cálculo multivariado'},
  {semestre:9,materia:'Cálculo multivariado'},
  {semestre:9,materia:'Cálculo multivariado'},
  {semestre:9,materia:'Cálculo multivariado'},
  {semestre:9,materia:'Cálculo multivariado'},

  {semestre:10,materia:'Cálculo multivariado'},
  {semestre:10,materia:'Cálculo multivariado'},
  {semestre:10,materia:'Cálculo multivariado'},
  {semestre:10,materia:'Cálculo multivariado'},
  {semestre:10,materia:'Cálculo multivariado'},
  {semestre:10,materia:'Cálculo multivariado'},
];



slideConfig = {
  "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "nextArrow":false,"prevArrow":false, "autoplay": true,
  responsive: [
    {
      breakpoint: 1048,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 778,
      settings: {
        slidesToShow: 2
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

  pagina:any;
  activo:any;

isValid1:boolean = true;
isValid2:boolean = false;
isValid3:boolean = false;
isValid4:boolean = false;

  paginas(pagina:string){

    if(pagina == "1"){

      this.isValid1= true;
      this.isValid2= false;
      this.isValid3= false;
      this.isValid4= false;
    }
    
    if(pagina == "2"){
      this.isValid1= false;
      this.isValid2= true;
      this.isValid3= false;
      this.isValid4= false;
    }
    
    if(pagina == "3"){
      this.isValid1= false;
      this.isValid2= false;
      this.isValid3= true;
      this.isValid4= false;
    }
    
    if(pagina == "4"){
      this.isValid1= false;
      this.isValid2= false;
      this.isValid3= false;
      this.isValid4= true;
    }

  }

  listarContacto =[
    {titulo:'¡Inscríbete en linea!', pic:this.inscribete_en_linea, link:'https://ciaf.digital/inscripciones/', detalle:''},
    {titulo:'¡Escríbeme y te asesoro!', pic:this.te_asesoro, link:'https://ciaf.digital/inscripciones/', detalle:''},
    {titulo:'¿Prefieres llamarme?', pic:this.llamame, link:'https://ciaf.digital/inscripciones/', detalle:''},
    {titulo:'¡Date una pasadita por nuestra sede!', pic:this.visita_sede, link:'https://ciaf.digital/inscripciones/', detalle:'Cra. 6 No. 24-56 • Pereira'},

  ];


  constructor() { }

  ngOnInit(): void {
    this.activo="1";
    this.pagina="1";
    this.paginas(this.pagina);
  }

}

