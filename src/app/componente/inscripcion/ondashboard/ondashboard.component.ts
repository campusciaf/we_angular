import { Component, AfterViewInit, Inject, Renderer2 } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ondashboard',
  templateUrl: './ondashboard.component.html',
  styleUrls: ['./ondashboard.component.css']
})
export class OndashboardComponent {

  consulta: any;
  nombre: any;
  estado: any;
  programa: any;
  jornada: any;
  identificacion:any;

  constructor(
    private conectarApiService:ConectarApiService,
    private router:Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private renderere: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
     
      if(data.length==1){
        this.identificacion=data[0]["identificacion"];
        this.nombre=data[0]['nombre'];
        this.estado=data[0]['estado'];
        this.programa=data[0]['fo_programa'];
        this.jornada=data[0]['jornada_e'];
        this.datosPrograma(this.programa);
      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('idnum');
        // this.router.navigate(['/login'])
      }
   
    });

    this.route.queryParams.subscribe(params => {
      console.log('Respuesta de ePayco en la URL:', params);
    });

  }


  nombreprograma:any;
  matricula_extraordinaria:any;

  datosPrograma(programa:any){
    const datos = { 
      opcion: 1, 
      programa_ac: programa,
    };
    this.conectarApiService.traerDatosPrograma(datos).subscribe((data) => {
      this.nombreprograma=data[0]['carnet'];
      this.matricula_extraordinaria=data[0]['matricula_extraordinaria'];
      this.pagoContado(); // Llamamos a ngAfterViewInit() después de obtener los datos
      this.pagoEfectivo(); // Llamamos a ngAfterViewInit() después de obtener los datos
      // console.log(data)
    });

  }

  pagoContado(): void {


      // Creamos el elemento <script>
      const script = this.renderer.createElement('script');
      script.src = 'https://checkout.epayco.co/checkout.js';

      // Agregamos los atributos necesarios para ePayco
      script.setAttribute('data-epayco-key', 'd4b482f39f386634f5c50ba7076eecff');
      script.setAttribute('data-epayco-amount', this.matricula_extraordinaria.toString());
      script.setAttribute('data-epayco-tax', '0');
      script.setAttribute('data-epayco-tax-base', this.matricula_extraordinaria.toString());
      script.setAttribute('data-epayco-name', this.nombreprograma);
      script.setAttribute('data-epayco-description', 'Pago WEB Pago matricula primera vez (contado)');
      script.setAttribute('data-epayco-extra1', this.identificacion);
      script.setAttribute('data-epayco-extra2', '');
      script.setAttribute('data-epayco-extra3', '');
      script.setAttribute('data-epayco-extra4', '');
      script.setAttribute('data-epayco-extra5', '');
      script.setAttribute('data-epayco-extra6', '');
      script.setAttribute('data-epayco-extra7', '');
      script.setAttribute('data-epayco-extra8', '');
      script.setAttribute('data-epayco-extra9', '');
      script.setAttribute('data-epayco-currency', 'cop');
      script.setAttribute('data-epayco-country', 'CO');
      script.setAttribute('data-epayco-test', 'true');
      script.setAttribute('data-epayco-external', 'false');
      script.setAttribute('data-epayco-response', 'https://ciaf.edu.co/ondashboard');
      script.setAttribute('data-epayco-confirmation', 'https://ciaf.edu.co/ondashboard');
      script.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pagos-pse.webp');
      
      // Es opcional, pero si deseas puedes agregarle la clase que utiliza ePayco
      script.className = 'epayco-button';

     
      // Buscamos el contenedor con id 'payment-container'
    const container = this.document.getElementById('payment-container');
    if (container) {
      this.renderer.appendChild(container, script);
      console.log('Script ePayco agregado al DOM correctamente.');
    } else {
      console.error('No se encontró el contenedor #payment-container.');
    }  

  }

  pagoEfectivo(): void {

    
      // Creamos el elemento <script>
      const script = this.renderere.createElement('script');
      script.src = 'https://checkout.epayco.co/checkout.js';

      // Agregamos los atributos necesarios para ePayco
      script.setAttribute('data-epayco-key', '8b4e82b040c208b31bc5be3f33830392');
      script.setAttribute('data-epayco-amount', '137279');
      script.setAttribute('data-epayco-tax', '0');
      script.setAttribute('data-epayco-tax-base', '137279');
      script.setAttribute('data-epayco-name', this.nombreprograma);
      script.setAttribute('data-epayco-description', 'Pago WEB Inscripciones');
      script.setAttribute('data-epayco-extra1', this.identificacion);
      script.setAttribute('data-epayco-extra2', '');
      script.setAttribute('data-epayco-extra3', '');
      script.setAttribute('data-epayco-extra4', '');
      script.setAttribute('data-epayco-extra5', '');
      script.setAttribute('data-epayco-extra6', '');
      script.setAttribute('data-epayco-extra7', '');
      script.setAttribute('data-epayco-extra8', '');
      script.setAttribute('data-epayco-extra9', '');
      script.setAttribute('data-epayco-currency', 'cop');
      script.setAttribute('data-epayco-country', 'CO');
      script.setAttribute('data-epayco-test', 'true');
      script.setAttribute('data-epayco-external', 'true');
      script.setAttribute('data-epayco-response', 'https://ciaf.digital/vistas/gracias.php');
      // script.setAttribute('data-epayco-confirmation', 'https://ciaf.digital/vistas/pagosrematriculaagregador.php');
      script.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pago-efectivo.webp');
      
      // Es opcional, pero si deseas puedes agregarle la clase que utiliza ePayco
      script.className = 'epayco-button';

        // ✅ ESCUCHAMOS RESPUESTA DE EPAYCO
        window.addEventListener('message', (event) => {
          if (event.data && event.data.x_response) { 
            console.log(' Pago confirmado por ePayco:', event.data);
            this.crearRegistro(event.data);
          }
        });


      // Buscamos el contenedor con id 'payment-container'
      const container = this.document.getElementById('payment-container-e');
      if (container) {
        this.renderer.appendChild(container, script);
      } else {
        console.error('No se encontró el contenedor #payment-container-e.');
      }


  }

  crearRegistro(data: any): void {
    console.log('Registrando pago con datos:', data);


    const registroDatos = {
      transaction_id: data.x_transaction_id,
      estado: data.x_response,
      valor: data.x_amount,
      estudiante: data.x_extra1,
    };

    // this.conectarApiService.guardarPago(registroDatos).subscribe(
    //   (respuesta) => {
    //     console.log(' Pago registrado correctamente:', respuesta);
    //   },
    //   (error) => {
    //     console.error(' Error al registrar el pago:', error);
    //   }
    // );
  }


}
