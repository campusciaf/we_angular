import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConectarApiService {

// produccion//
API: string='https://ciaf.edu.co/api_rest';


//local//
// API: string='http://localhost/web-angular/api_rest';
autorizacion = 'KFTDQFYvqbPLXkHTuXQJR4Qy3vUryK';


  constructor(private clienteHttp:HttpClient) { }

  obtenerNoticias(){
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/noticias.php',{headers});
  }

  obtenerSlide(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/slide.php',{headers});
  }

  obtenerContinuada(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/continuada.php',{headers});
  }

  obtenerContinuadaId(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/continuada.php?id='+id,{headers});
  }

  obtenerEventos(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/eventos.php',{headers});
  }

  obtenerInstagram(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/instagram.php',{headers});
  }

  
}
