import { Component } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';



declare var $:any;
declare let alertify: any;

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.css']
})
export class IniciarComponent {

  constructor(
    private conectarApiService:ConectarApiService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.buildForm();
  }



  myForm!: FormGroup;
 
  private buildForm(){
    this.myForm = this.fb.group({

      user_identificacion: ['', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ],
         updateOn: 'blur'
      }],
      user_identificacion_r: ['', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ],
         updateOn: 'blur'
      }],
      user_nombre:['',{
        validators: [
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(40)
       ],
       updateOn: 'blur'
      }],
      user_email: ['', {
        validators: [
           Validators.required, 
           Validators.email
        ],
        updateOn: 'blur'
    }],
    user_celular:[null,{
      validators: [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        
     ],
     updateOn: 'blur'
    }],
    user_programa: ['',[Validators.required,]],
    acepto: ['',[Validators.required,Validators.requiredTrue]]
    });
  }


  registro() {
    this.conectarApiService.registroInteresado(this.myForm.value).subscribe((data) => {
      if(data>0){
        alertify.alert('¡Registro correcto!', 'Enviamos los datos de acceso a tu cuenta de correo electrónico!', function(){ alertify.success('Ok'); });
        setTimeout(() => {
          this.router.navigate(['/onlogin']);
        }, 3000); // 3 segundos
        
      }else{
        alertify.set('notifier','position', 'top-center');
        alertify.error('¡No se pudo crear la cuenta!'); 
      }
    });
  }

  account_validation_messages = {
    'user_identificacion': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'minlength', message: 'El numero debe terner 8 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    'user_identificacion_r': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'minlength', message: 'El numero debe terner 8 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    'user_nombre': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'Su nombre no puede tener más de 33 caracteres' },
      { type: 'pattern', message: 'Su nombre debe contener solo letras' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'user_email': [
      { type: 'required', message: 'Campo de correo electrónico requerido' },

    ],
    'user_celular': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],

    'acepto': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }



}
