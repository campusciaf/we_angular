import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';

@Component({
  selector: 'app-ondashboard',
  templateUrl: './ondashboard.component.html',
  styleUrls: ['./ondashboard.component.css']
})
export class OndashboardComponent {

  consulta: any;
  nombre: any;
  estado: any;

  constructor(
    private conectarApiService:ConectarApiService,
    private router:Router
  ) {

  }
  public img_logo="assets/image/logo-blanco.webp";
  public img_destino="assets/image/ico-destino.webp";
  public img_ubicacion="assets/image/ico-location.webp";
  public img_campus="assets/image/ico-campus.webp";

  logAutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/iniciar'])
  }

  ngOnInit() : void{

    let caso=localStorage.getItem('idnum');
    let token=localStorage.getItem('token');

    this.conectarApiService.onInteresados(caso,token).subscribe((data) => {
      this.consulta=data;
      console.log(data)
      if(data.length==1){
        this.nombre=data[0]['nombre'];
        this.estado=data[0]['estado'];
      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('idnum');
        // this.router.navigate(['/login'])
      }
   
    });

  }

}
