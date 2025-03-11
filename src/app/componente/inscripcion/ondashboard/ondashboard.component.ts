import { Component, AfterViewInit, Inject, Renderer2 } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DOCUMENT } from '@angular/common';


declare var $:any;
declare let alertify: any;

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
  id_estudiante:any;
  identificacion:any;
  celular:any;
  documentos:any;
  matricula:any;
  formulario:any;
  inscripcion:any;
  entrevista:any;
  pecuniario:any;
  

  isValidForm1:boolean = true;// formulario para cargar el archivo
  isValidForm2:boolean = true;// formulario para cargar el archivo
  isValidForm3:boolean = true;// formulario para cargar el archivo
  isValidForm4:boolean = true;// formulario para cargar el archivo
  isValidForm5:boolean = true;// formulario para cargar el archivo
  isValidForm6:boolean = true;// formulario para cargar el archivo
  isValidForm7:boolean = true;// formulario para cargar el archivo

  constructor(
    private conectarApiService:ConectarApiService,
    private router:Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private renderere: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.buildFormulario();
    this.buildEntrevista();
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


    this.conectarApiService.onInteresados(caso,token,0).subscribe((data) => {

      if(data.length==1){
        this.id_estudiante=data[0]["id_estudiante"];// id de on interesados
        this.identificacion=data[0]["identificacion"];
        this.nombre=data[0]['nombre'];
        this.estado=data[0]['estado'];
        this.programa=data[0]['fo_programa'];
        this.jornada=data[0]['jornada_e'];
        this.celular=data[0]['celular'];
        this.formulario=data[0]['formulario'];// trae el estado del formulario de inscripción
        this.entrevista=data[0]['entrevista'];// trae el estado del formulario de inscripción
        this.inscripcion=data[0]['inscripcion'];// trae el estado del formulario de inscripción
        this.documentos=data[0]['documentos'];// trae el estado de los docuemntos
        this.matricula=data[0]['matricula'];// trae el estado de la matricula 1 pendiente 0 pago
        this.datosPrograma(this.programa);

        // Asignar los valores al formulario
        this.myFormulario.patchValue({
          jornada: data[0]['jornada_e'] || '',
          nombre: data[0]['nombre'],
          nombre_2: data[0]['nombre_2'] || '',
          apellidos: data[0]['apellidos'] || '',
          apellidos_2: data[0]['apellidos_2'] || '',
          tipo_documento: data[0]['tipo_documento'] || '',
          celular: data[0]['celular'] || '',
          email: data[0]['email'] || '',
          nivel_escolaridad: data[0]['nivel_escolaridad'] || '',
          nombre_colegio: data[0]['nombre_colegio'] || '',
          fecha_graduacion: data[0]['fecha_graduacion'] || ''
        });



      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('idnum');
        this.router.navigate(['/login'])
      }
   
    });

    this.conectarApiService.onSoportes(caso,token,1).subscribe((data) => {if(data==true){this.isValidForm1=false;}});
    this.conectarApiService.onSoportes(caso,token,2).subscribe((data) => {if(data==true){this.isValidForm2=false;}});
    this.conectarApiService.onSoportes(caso,token,3).subscribe((data) => {if(data==true){this.isValidForm3=false;}});
    this.conectarApiService.onSoportes(caso,token,4).subscribe((data) => {if(data==true){this.isValidForm4=false;}});
    this.conectarApiService.onSoportes(caso,token,5).subscribe((data) => {if(data==true){this.isValidForm5=false;}});
    this.conectarApiService.onSoportes(caso,token,6).subscribe((data) => {if(data==true){this.isValidForm6=false;}});
    this.conectarApiService.onSoportes(caso,token,7).subscribe((data) => {if(data==true){this.isValidForm7=false;}});

    this.route.queryParams.subscribe(params => {
      // console.log('Respuesta de ePayco en la URL:', params);
      // Validar si el pago fue exitoso
      if (params['x_response'] && params['x_response'].toLowerCase() === 'aceptada') {
        // console.log('Pago aceptado, registrando en la base de datos...');
        this.crearRegistro(params);
      } else {
        // console.warn('Pago no aceptado:', params['x_response']);
      }
    });



    

  }


  nombreprograma:any;
  matricula_extraordinaria:any;
  valorinscripcion:any;
  valorseguro:any;
  valorinsseg:any;

  datosPrograma(programa:any){
    const datos = { 
      opcion: 1, // quiere decir que es traer datos
      programa_ac: programa,
    };
    this.conectarApiService.traerDatosPrograma(datos).subscribe((data) => {
      this.nombreprograma=data[0]['carnet'];
      this.matricula_extraordinaria=data[0]['matricula_extraordinaria'];
      this.valorinscripcion=data[0]['valor_inscripcion'];
      this.valorseguro=data[0]['valor_seguro'];
      this.valorinsseg=this.valorinscripcion+this.valorseguro;
      this.pecuniario=Math.ceil(data[0]['matricula_ordinaria']+(data[0]['matricula_ordinaria']*(data[0]['aporte_social']/100)));

      this.pagoContado(); // Llamamos a ngAfterViewInit() después de obtener los datos
      this.pagoEfectivo(); // Llamamos a ngAfterViewInit() después de obtener los datos

      this.pagoContadoi(); // Llamamos a ngAfterViewInit() después de obtener los datos
      this.pagoEfectivoi(); // Llamamos a ngAfterViewInit() después de obtener los datos
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
      script.setAttribute('data-epayco-description', 'matricula');
      script.setAttribute('data-epayco-extra1', this.identificacion);
      script.setAttribute('data-epayco-extra2', this.id_estudiante);
      script.setAttribute('data-epayco-extra3',  this.nombre);
      script.setAttribute('data-epayco-extra4', this.celular);
      script.setAttribute('data-epayco-extra5', this.documentos);
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

     if(this.matricula==1){// si no ha realizado pago
        // Buscamos el contenedor con id 'payment-container'
        const container = this.document.getElementById('payment-container');
        if (container) {
          this.renderer.appendChild(container, script);
          // console.log('Script ePayco agregado al DOM correctamente.');
          
        } else {
          console.error('No se encontró el contenedor #payment-container.');
        } 
     }
            
  }

  pagoEfectivo(): void {
      // Creamos el elemento <script>
      const script = this.renderere.createElement('script');
      script.src = 'https://checkout.epayco.co/checkout.js';

      // Agregamos los atributos necesarios para ePayco
      script.setAttribute('data-epayco-key', '8b4e82b040c208b31bc5be3f33830392');
      script.setAttribute('data-epayco-amount',  this.matricula_extraordinaria.toString());
      script.setAttribute('data-epayco-tax', '0');
      script.setAttribute('data-epayco-tax-base', this.matricula_extraordinaria.toString());
      script.setAttribute('data-epayco-name', this.nombreprograma);
      script.setAttribute('data-epayco-description', 'matricula');
      script.setAttribute('data-epayco-extra1', this.identificacion);
      script.setAttribute('data-epayco-extra2', this.id_estudiante);
      script.setAttribute('data-epayco-extra3',  this.nombre);
      script.setAttribute('data-epayco-extra4', this.celular);
      script.setAttribute('data-epayco-extra5', this.documentos);
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
      script.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pago-efectivo.webp');
      
      // Es opcional, pero si deseas puedes agregarle la clase que utiliza ePayco
      script.className = 'epayco-button';


      if(this.matricula==1){// si no ha realizado pago
        // Buscamos el contenedor con id 'payment-container'
        const container = this.document.getElementById('payment-container-e');
        if (container) {
          this.renderer.appendChild(container, script);
          // console.log('Script ePayco agregado al DOM correctamente.');
          
        } else {
          console.error('No se encontró el contenedor #payment-container-e.');
        } 
     }


  }

  pagoContadoi(): void {


    // Creamos el elemento <script>
    const script = this.renderer.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';

    // Agregamos los atributos necesarios para ePayco
    script.setAttribute('data-epayco-key', 'd4b482f39f386634f5c50ba7076eecff');
    script.setAttribute('data-epayco-amount', this.valorinsseg.toString());
    script.setAttribute('data-epayco-tax', '0');
    script.setAttribute('data-epayco-tax-base', this.valorinsseg.toString());
    script.setAttribute('data-epayco-name', this.nombreprograma);
    script.setAttribute('data-epayco-description', 'inscripcion');
    script.setAttribute('data-epayco-extra1', this.identificacion);
    script.setAttribute('data-epayco-extra2', this.id_estudiante);
    script.setAttribute('data-epayco-extra3',  this.nombre);
    script.setAttribute('data-epayco-extra4', this.celular);
    script.setAttribute('data-epayco-extra5', this.formulario);
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

   if(this.matricula==1){// si no ha realizado pago
      // Buscamos el contenedor con id 'payment-container'
      const container = this.document.getElementById('payment-container-i');
      if (container) {
        this.renderer.appendChild(container, script);
        // console.log('Script ePayco agregado al DOM correctamente.');
        
      } else {
        console.error('No se encontró el contenedor #payment-container-i.');
      } 
   }
          
  }

  pagoEfectivoi(): void {
    // Creamos el elemento <script>
    const script = this.renderere.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';

    // Agregamos los atributos necesarios para ePayco
    script.setAttribute('data-epayco-key', '8b4e82b040c208b31bc5be3f33830392');
    script.setAttribute('data-epayco-amount',  this.valorinsseg.toString());
    script.setAttribute('data-epayco-tax', '0');
    script.setAttribute('data-epayco-tax-base', this.valorinsseg.toString());
    script.setAttribute('data-epayco-name', this.nombreprograma);
    script.setAttribute('data-epayco-description', 'inscripcion');
    script.setAttribute('data-epayco-extra1', this.identificacion);
    script.setAttribute('data-epayco-extra2', this.id_estudiante);
    script.setAttribute('data-epayco-extra3',  this.nombre);
    script.setAttribute('data-epayco-extra4', this.celular);
    script.setAttribute('data-epayco-extra5', this.formulario);
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
    script.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pago-efectivo.webp');
    
    // Es opcional, pero si deseas puedes agregarle la clase que utiliza ePayco
    script.className = 'epayco-button';


    if(this.matricula==1){// si no ha realizado pago
      // Buscamos el contenedor con id 'payment-container'
      const container = this.document.getElementById('payment-container-i-e');
      if (container) {
        this.renderer.appendChild(container, script);
        // console.log('Script ePayco agregado al DOM correctamente.');
        
      } else {
        console.error('No se encontró el contenedor #payment-container-i-e.');
      } 
  }


  }

  crearRegistro(data: any): void {
  
    // console.log(data)
    
    const registroDatos = {
      opcion:2,//quiere decir que es un pago
      x_cust_id_cliente: data.x_cust_id_cliente,
      x_ref_payco: data.x_ref_payco,
      x_id_factura: data.x_id_factura,
      x_id_invoice: data.x_id_invoice,
      x_description: data.x_description,
      x_amount: data.x_amount,
      x_amount_country: data.x_amount_country,
      x_amount_ok: data.x_amount_ok,
      x_tax: data.x_tax,
      x_amount_base: data.x_amount_base,
      x_currency_code: data.x_currency_code,
      x_bank_name: data.x_bank_name,
      x_cardnumber: data.x_cardnumber,
      x_quotas: data.x_quotas,
      x_respuesta: data.x_respuesta,
      x_response: data.x_response,
      x_approval_code: data.x_approval_code,
      x_transaction_id: data.x_transaction_id,
      x_fecha_transaccion: data.x_fecha_transaccion,
      x_transaction_date: data.x_transaction_date,
      x_cod_respuesta: data.x_cod_respuesta,
      x_cod_response: data.x_cod_response,
      x_response_reason_text: data.x_response_reason_text,
      x_errorcode: data.x_errorcode,
      x_cod_transaction_state: data.x_cod_transaction_state,
      x_transaction_state: data.x_transaction_state,
      x_franchise: data.x_franchise,
      x_business: data.x_business,
      x_customer_doctype: data.x_customer_doctype,
      x_customer_document: data.x_customer_document,
      x_customer_name: data.x_customer_name,
      x_customer_lastname: data.x_customer_lastname,
      x_customer_email: data.x_customer_email,
      x_customer_phone: data.x_customer_phone,
      x_customer_movil: data.x_customer_movil,
      x_customer_ind_pais: data.x_customer_ind_pais,
      x_customer_country: data.x_customer_country,
      x_customer_city: data.x_customer_city,
      x_customer_address: data.x_customer_address,
      x_customer_ip: data.x_customer_ip,
      x_test_request: data.x_test_request,
      x_extra1: data.x_extra1,
      x_extra2: data.x_extra2,
      x_extra3: data.x_extra3,
      x_extra4: data.x_extra4,
      x_extra5: data.x_extra5,
      x_extra6: data.x_extra6,
      x_extra7: data.x_extra7,
      x_extra8: data.x_extra8,
      x_extra9: data.x_extra9,
      x_extra10: data.x_extra10,
      x_tax_ico: data.x_tax_ico,
      x_payment_date: data.x_payment_date,
      x_signature: data.x_signature,
      x_transaction_cycle: data.x_transaction_cycle,
      is_processable: data.is_processable
    };


    this.conectarApiService.guardarPago(registroDatos).subscribe((resultado) => {
      // console.log(resultado)

      if(resultado==0){
        alertify.error('¡No se pudo realizar el pago!'); 
        this.router.navigate(['ondashboard']);
      }else{
        alertify.success('¡Pago exitoso!'); 
        this.router.navigate(['ondashboard']);
      }

    });

  }

  myFormulario!: FormGroup;
  private buildFormulario(){
    this.myFormulario = this.fb.group({
      jornada: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]],
      nombre_2: ['', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')]],
      apellidos_2: ['', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')],
      tipo_documento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      nivel_escolaridad: ['', Validators.required],
      nombre_colegio: ['', Validators.required],
      fecha_graduacion: ['', Validators.required]
    });
  }

  datoformulario:any;
  guardarFormulario() {

    if (this.myFormulario.valid) {

      let datosFormulario = {
        ...this.myFormulario.value, // Copia todos los valores del formulario
        opcion: 3, // Agrega la variable opcion
        id_estudiante: this.id_estudiante,
        estado_inscripcion: this.inscripcion
      };

      this.conectarApiService.actualizarFormulario(datosFormulario).subscribe(respuesta=>{
        this.datoformulario=respuesta;
        if(respuesta>0){

          alertify.set('notifier','position', 'top-center');
          alertify.success('¡Formulario de inscripcion validado correctamente!');   

          // Cerrar modal manualmente
          let modal = document.getElementById("formulario");
          if (modal) {
            modal.style.display = "none"; // Oculta el modal
            document.body.classList.remove("modal-open"); // Remueve la clase de Bootstrap
            let backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
              backdrop.remove(); // Remueve la capa oscura del modal
            }
          }

          this.ngOnInit();

        }
      }); 

    } else {
      alertify.set('notifier','position', 'top-center');
      alertify.error('¡El formulario no es válido!');
    }
  }

  myEntrevista!: FormGroup;

  private buildEntrevista() {
    this.myEntrevista = this.fb.group({
      salud_fisica: ['', Validators.required],
      condicion_de_salud: ['', Validators.required],
      si_condicion_de_salud: [''], // No required aquí
      condicion_neurologica: ['', Validators.required],
      si_condicion_neurologica: [''],
      niveles_de_estres: ['', Validators.required],
      comodo_salud_mental: ['', Validators.required],
      acceso_salud_mental: ['', Validators.required],
      recibir_apoyo_mental: ['', Validators.required],
      dificultad_emocional: ['', Validators.required],
      referir_persona: ['', Validators.required],
      sostiene: ['', Validators.required],
      labora: ['', Validators.required],
      donde_labora: [''],
      tiempo_laborando: [''],
      nombre_referencia: ['', Validators.required],
      celular_referencia: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      parentesco_referencia: ['', Validators.required],
      solicitado_beca: ['', Validators.required],
      desempeno_academico: ['', Validators.required],
      materia_apoyo: ['', Validators.required],
      si_materia_apoyo: [''],
      habilidades_estudio: ['', Validators.required],
      dificultades_exigencias: ['', Validators.required],
      comodo_herramientas: ['', Validators.required]
    });
  
    this.setupConditionalValidation();
  }

  private setupConditionalValidation() {
    this.myEntrevista.get('condicion_de_salud')?.valueChanges.subscribe(value => {
  const field = this.myEntrevista.get('si_condicion_de_salud');
  if (value === 'si') {
    field?.setValidators(Validators.required);
  } else {
    field?.clearValidators();
    field?.setValue('');
  }
  field?.updateValueAndValidity();
});

// Si "labora" es "si", requerimos "donde_labora" y "tiempo_laborando"
this.myEntrevista.get('labora')?.valueChanges.subscribe(value => {
  const field1 = this.myEntrevista.get('donde_labora');
  const field2 = this.myEntrevista.get('tiempo_laborando');
  if (value === 'si') {
    field1?.setValidators(Validators.required);
    field2?.setValidators(Validators.required);
  } else {
    field1?.clearValidators();
    field2?.clearValidators();
    field1?.setValue('');
    field2?.setValue('');
  }
  field1?.updateValueAndValidity();
  field2?.updateValueAndValidity();
});

// Si "materia_apoyo" es "si", requerimos "si_materia_apoyo"
this.myEntrevista.get('materia_apoyo')?.valueChanges.subscribe(value => {
  const field = this.myEntrevista.get('si_materia_apoyo');
  if (value === 'si') {
    field?.setValidators(Validators.required);
  } else {
    field?.clearValidators();
    field?.setValue('');
  }
  field?.updateValueAndValidity();
});
  }
  get invalidControls() {
    return Object.keys(this.myEntrevista.controls).filter(key => this.myEntrevista.get(key)?.invalid);
  }

  guardarEntrevista() {

    if (this.myEntrevista.valid) {

      let datosEntrevista = {
        ...this.myEntrevista.value, // Copia todos los valores del formulario
        opcion: 4, // Agrega la variable opcion
        id_estudiante: this.id_estudiante
      };
      
      this.conectarApiService.insertarEntrevista(datosEntrevista).subscribe(respuesta=>{
        this.datoformulario=respuesta;
        console.log(respuesta);
        if(respuesta>0){

          alertify.set('notifier','position', 'top-center');
          alertify.success('¡Formulario de entrevista validado correctamente!');   

          // Cerrar modal manualmente
          let modal = document.getElementById("entrevista");
          if (modal) {
            modal.style.display = "none"; // Oculta el modal
            document.body.classList.remove("modal-open"); // Remueve la clase de Bootstrap
            let backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
              backdrop.remove(); // Remueve la capa oscura del modal
            }
          }

          this.ngOnInit();

        }
      }); 

    } else {
      alertify.set('notifier','position', 'top-center');
      alertify.error('¡El formulario no es válido!');
    }
  }

  /* subir documentos */

  
  selectedFile: File | null = null;
  selectedFileName: string = '';

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }



  selectedFile2: File | null = null;
  selectedFileName2: string = '';

  onFileChange2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile2 = file;
      this.selectedFileName2 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }


  selectedFile3: File | null = null;
  selectedFileName3: string = '';

  onFileChange3(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile3 = file;
      this.selectedFileName3 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }



  selectedFile4: File | null = null;
  selectedFileName4: string = '';

  onFileChange4(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile4 = file;
      this.selectedFileName4 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }



  selectedFile5: File | null = null;
  selectedFileName5: string = '';

  onFileChange5(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile5 = file;
      this.selectedFileName5 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }


  selectedFile6: File | null = null;
  selectedFileName6: string = '';

  onFileChange6(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile6 = file;
      this.selectedFileName6 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }


  selectedFile7: File | null = null;
  selectedFileName7: string = '';

  onFileChange7(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile7 = file;
      this.selectedFileName7 = file.name; // Mostrar el nombre del archivo seleccionado
    }
  }



  onSubmit(tipo:any) {

    switch (tipo) {
      case 1:
          this.selectedFile = this.selectedFile;
          break;
      case 2:
          this.selectedFile = this.selectedFile2;
          break;
      case 3:
          this.selectedFile = this.selectedFile3;
          break;
      case 4:
            this.selectedFile = this.selectedFile4;
            break;
      case 5:
            this.selectedFile = this.selectedFile5;
            break;
      case 6:
            this.selectedFile = this.selectedFile6;
            break;
      case 7:
            this.selectedFile = this.selectedFile7;
            break;

      default:
          // Manejo de caso por defecto si es necesario
          this.selectedFile = null;
          break;
  }


    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('id_estudiante', this.id_estudiante); // Envía el valor de usuario
      formData.append('opcion', '5'); // Envía el valor de usuario
      formData.append('documento', tipo); // Envía el valor de usuario
      

      this.conectarApiService.subirDocumento(formData).subscribe((data) => {
        console.log(data)
        if(data == "ok"){
      
          alertify.success('¡Documento cargado!');
          this.ngOnInit(); 
          
        }
        if(data=="nopdf"){
          alertify.error('¡No cumple con los parametros!'); 
        }
        
      });

    }

  }

}
