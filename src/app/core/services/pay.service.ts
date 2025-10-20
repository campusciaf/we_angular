import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable, map } from 'rxjs';

import {
  Installment,
  PaymentCreationResponse,
  PaymentMethod,
} from '@/app/clases/payment';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  API: string = '';
  autorizacion: string = '';
 
  constructor(
    private clienteHttp: HttpClient,
  ) {
    this.API = environment.base_url;
    this.autorizacion = 'KFTDQFYvqbPLXkHTuXQJR4Qy3vUryK';
  }

  obtenerBlog(){
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.get(this.API+ '/blog.php',{headers});
  }

  registroInteresado(data :any): Observable<any> {
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post(`${this.API}/usuario.php`, JSON.stringify(data),{headers});
  }

  getCurrentInstallments(data: any): Observable<Installment[]> {
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post<any>(`${this.API}/financiacion.php?action=getCurrentInstallments`, JSON.stringify(data), {headers}).pipe(map(r => r.data.creditos ?? []));
  }

  createPayment(data: any): Observable<PaymentCreationResponse> {
    const headers = new HttpHeaders({'Autorizacion': this.autorizacion});
    return this.clienteHttp.post<any>(`${this.API}/financiacion.php?action=PagarCuota`, JSON.stringify(data), {headers});
  }


}
