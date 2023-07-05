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
  obtenerNoticiaId(id:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/noticias.php?id='+id,{headers});
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

  obtenerEmprendimientos(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/emprendimientos.php',{headers});
  }

  obtenerEmprendimientoId(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/emprendimientos.php?id='+id,{headers});
  }

  obtenerEventos(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/eventos.php',{headers});
  }

  obtenerInstagram(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/instagram.php',{headers});
  }

  obtenerBienestarConvenios(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/bienestar_convenios.php',{headers});
  }

  obtenerAliados(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/aliados.php',{headers});
  }

  obtenerProgramaId(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/programa.php?id='+id,{headers});
  }

  obtenerDesempenateId(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/programa_desempenate.php?id='+id,{headers});
  }

  obtenerCalidadCrecimiento(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/calidad_crecimiento.php',{headers});
  }

  insertarCliente(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    // return this.clienteHttp.post(this.API+ '/agregarDatos.php',{headers});
    return this.clienteHttp.post(this.API+ '/agregarDatos.php',JSON.stringify(cliente),{headers});
  }

  obtenercategoriasReglamentos(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/categorias_reglamentos.php',{headers});
  }
  obtenerReglamentos(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/reglamentos.php?id='+id,{headers});
  }



  
}
