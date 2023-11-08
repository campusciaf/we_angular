import { Component, OnInit } from '@angular/core';


declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public facebook="assets/image/facebook.webp";
  public instagram="assets/image/instagram.webp";
  public youtube="assets/image/youtube.webp";
  public twitter="assets/image/twitter.webp";
  public tiktok="assets/image/tiktok.webp";
  public logo_blanco="assets/image/logo-blanco.webp";
  public vigilada="assets/image/vigilada.webp";
  public creatividad="assets/image/creatividad.webp";
  public correociaf="contacto@ciaf.edu.co";
  constructor() { }




  ngOnInit(): void {

  }

}
