import { Component, OnInit } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {

  aliados:Array<any> =[

    {titulo:'uno', imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png'},
    {titulo:'dos',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png'},
    {titulo:'tres',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png'},
    {titulo:'cuatro',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png'},
    {titulo:'cinco',imagen:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png'}

  ]

  slideConfig = {
    "slidesToShow": 6, "slidesToScroll": 1, "infinite": true, "autoplay": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    
  }

}
