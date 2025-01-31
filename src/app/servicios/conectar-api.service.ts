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
//API: string='http://localhost/api_rest';
autorizacion = 'KFTDQFYvqbPLXkHTuXQJR4Qy3vUryK';


  constructor(private clienteHttp:HttpClient) { }


  obtenerBlog(){
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/blog.php',{headers});
  }
  obtenerBlogId(id:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/blog.php?id='+id,{headers});
  }
  obtenerNoticias(){
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/noticias.php',{headers});
  }
  obtenerNoticiasPrincipal(id:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/noticias.php?id='+id,{headers});
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

  obtenerHorario(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/horarios.php',{headers});
  }

  obtenerHorarioProximo(id:number): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/horarios.php?id='+id,{headers});
  }

  insertarClienteExpou(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    // return this.clienteHttp.post(this.API+ '/agregarDatos.php',{headers});
    return this.clienteHttp.post(this.API+ '/agregarDatosExpoU.php',JSON.stringify(cliente),{headers});
  }

  insertarClienteContinuada(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(this.API+ '/agregarDatosContinuada.php',JSON.stringify(cliente),{headers});
  }
  

  verificarClienteContinuada(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(this.API+ '/verificarDatosContinuada.php',JSON.stringify(cliente),{headers});
  }

  verificarEgresado(id:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/egresados.php?id='+id,{headers});
  }

  verificarRegistro(id:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/egresados.php?id_credencial='+id,{headers});
  }

  actualizarEgresado(datos:any): Observable<any>{
    return this.clienteHttp.put(this.API+ '/egresados.php', datos);
  }

  insertarCVadmin(datos:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(this.API+ '/cvadmin.php',datos,{headers});
  }
  dependencias(): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/cvadmin.php',{headers});
  }


/* on interesados */
  login(datos: any): Observable<any> {
    return this.clienteHttp.post(this.API+ '/login.php', datos);
  }
  registroInteresado(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(this.API+ '/registro.php',JSON.stringify(cliente),{headers});
  }
  
  onInteresados(id:any,token: any): Observable<any>{
    return this.clienteHttp.get(this.API+ '/oninteresados.php?id='+id+'&token='+token);
  }


  /* referidos */

  insertarReferido(cliente:any): Observable<any>{
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(this.API+ '/referidos.php',JSON.stringify(cliente),{headers});
  }


}
