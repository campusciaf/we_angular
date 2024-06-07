import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';


declare var jQuery:any;
declare var $:any;
declare let alertify: any;


@Component({
  selector: 'app-expo-u',
  templateUrl: './expo-u.component.html',
  styleUrls: ['./expo-u.component.css']
})
export class ExpoUComponent {

  constructor(
    private conectarApiService:ConectarApiService,
    private formBuilder: FormBuilder
  ){
    this.buildForm();
  }

  
  ngOnInit() {
    this.buildForm();

  }

  element = true;
  element2 = false;
  nombrediploma:any;
  programadiploma:any;



  myForm!: FormGroup;
  insertarNuevoCliente: any;

  completeLogin(){   
    this.myForm.reset();   
  }

  private buildForm(){
    this.myForm = this.formBuilder.group({
      nombre:['',{
        validators: [
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(40)
       ],
       updateOn: 'blur'
      }],
      correo: ['', {
        validators: [
           Validators.required, 
           Validators.email
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
    nombre_acudiente:['',{
      validators: [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(40)
     ],
     updateOn: 'blur'
    }],
    celular_acudiente:[null,{
      validators: [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        
     ],
     updateOn: 'blur'
    }],
    fo_programa: ['',[Validators.required,]],
    acepto: ['',[Validators.required,Validators.requiredTrue]]
    });
  }

  agregar(){
    this.conectarApiService.insertarClienteExpou(this.myForm.value).subscribe(respuesta=>{
      this.insertarNuevoCliente=respuesta;
      if(respuesta>0){
        alertify.set('notifier','position', 'top-center');
        alertify.success('Registro correcto');
        this.element=false; 
        this.element2 = true;
        this.nombrediploma=this.myForm.value.nombre;
        this.programadiploma=this.myForm.value.fo_programa;
        this.completeLogin();
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
    'correo': [
      { type: 'required', message: 'campo de correo requerido' },
      { type: 'email', message: 'Ingresar un correo valido' }
    ],
    'celular': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    'nombre_acudiente': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'Su nombre no puede tener más de 33 caracteres' },
      { type: 'pattern', message: 'Su nombre debe contener solo letras' },
      { type: 'validUsername', message: 'Your username has already been taken' }

    ],
    'celular_acudiente': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
    }


}
