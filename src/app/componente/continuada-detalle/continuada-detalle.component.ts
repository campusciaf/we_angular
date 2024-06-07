import { Component, OnInit } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare var jQuery:any;
declare var $:any;
declare let alertify: any;


@Component({
  selector: 'app-continuada-detalle',
  templateUrl: './continuada-detalle.component.html',
  styleUrls: ['./continuada-detalle.component.css']
})
export class ContinuadaDetalleComponent implements OnInit {
  public educacion_continuada="assets/image/educacion-continuada.webp";
  public logo_continuada="assets/image/logo-continuada.webp";
  public calendario="assets/image/calendario-regular.webp";
  public vistas="assets/image/vistas.webp";
  public prev="assets/image/btn-prev.webp";
  

detalleCurso:any;


  constructor(
    private conectarApiService:ConectarApiService,
    private  _route:ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {

    var id:number = +this._route.snapshot.paramMap.getAll('id');
    this.conectarApiService.obtenerContinuadaId(id).subscribe(respuesta=>{
      this.detalleCurso=respuesta
    }); 

    this.buildForm();
    this.buildFormVerificar();
    

  }


  myForm!: FormGroup;
  insertarNuevoCliente: any;
  element = false;

  private buildForm(){
    this.myForm = this.formBuilder.group({

    id_curso:[null,{

    }],

    identificacion:[null,{
      validators: [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(12),

        
     ],
     updateOn: 'blur'
    }],

    nombre:['',{
      validators: [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(40)
     ],
     updateOn: 'blur'
    }],

    celular:[null,{
      validators: [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        
     ],
     updateOn: 'blur'
    }],
    email: ['', {
      validators: [
         Validators.required, 
         Validators.email
      ],
      updateOn: 'blur'
  }],
  acepto: ['',[Validators.required,Validators.requiredTrue]]
    });
  }

  modalverificacion(){
    var id:number = +this._route.snapshot.paramMap.getAll('id');
    $("#modalregistro").modal("show");
    this.myForm.controls['id_curso'].setValue(id)
  }

  completeLogin(){   
    this.myForm.reset();   
  }
  agregar(){

    this.conectarApiService.insertarClienteContinuada(this.myForm.value).subscribe(respuesta=>{
      this.insertarNuevoCliente=respuesta;
      if(respuesta==0){
        alertify.set('notifier','position', 'top-center');
        alertify.error('Ya esta registrado, puedes realizar el pago');
      }else{
        this.completeLogin();
        $("#modalregistro").modal("hide");
        alertify.set('notifier','position','top-center');
        alertify.success('Registro correcto, puede realizar el pago en linea');
      }
    }); 
  }

  account_validation_messages = {
    'nombre': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'Su nombre no puede tener más de 33 caracteres' },
      { type: 'pattern', message: 'Su nombre debe contener solo letras' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'campo de correo requerido' },
      { type: 'email', message: 'Ingresar un correo valido' }
    ],
    'celular': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],

    'identificacion': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 11 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 11 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],

    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

/******** verificar pago */
  verificarNuevoCliente: any;
  myFormverificar!: FormGroup;
  private buildFormVerificar(){
    this.myFormverificar = this.formBuilder.group({

    id_curso_verificar:[null,{}],

    identificacion_verificar:[null,{
      validators: [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(12),

        
     ],
     updateOn: 'blur'
    }],




    });
  }
  modalverificar(){
    var id:number = +this._route.snapshot.paramMap.getAll('id');
    this.myFormverificar.controls['id_curso_verificar'].setValue(id)
    $("#modalverificar").modal("show");
  }
  verificar_validation_messages = {
    'identificacion_verificar': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 11 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 11 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }
    ],
  }

  verificar(){

    this.conectarApiService.verificarClienteContinuada(this.myFormverificar.value).subscribe(respuesta=>{
      this.verificarNuevoCliente=respuesta;
      console.log(respuesta);
      if(respuesta==0){
        alertify.set('notifier','position', 'top-center');
        alertify.success('Puedes realizar el pago');
      }else{
        $("#modalregistro").modal("hide");
        alertify.set('notifier','position','top-center');
        alertify.error('No puede realizar el pago, debe registrarse');
      }
    }); 
  }

  /* *************************** **********************************/
  modalpago(){
    $("#modalpago").modal("show");
  }


 

   

}
