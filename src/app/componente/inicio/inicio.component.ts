import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/clases/cliente';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


declare var jQuery:any;
declare var $:any;
declare let alertify: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  creatividadPic:Array<any> =[
    {imagen:'assets/image/emprendimientos.webp',titulo:'Vitrina de Emprendimientos',link:'/emprendimientos',tipolink:'1'},
    {imagen:'assets/image/pereira4ri.webp',titulo:'Pereira 4RI ',link:"https://pereira4ri.com/",tipolink:'2'},
    {imagen:'assets/image/hub.webp',titulo:'HUB de la Creatividad',link:"",tipolink:'1'},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'Memorias Institucionales',link:"https://heyzine.com/flip-book/97549097a8.html",tipolink:'2'},
  ]

  insertarNuevoCliente: any;

  activarLinkMenu(){
    $("#uno").removeClass("active-link-dropdow");
    $("#dos").removeClass("active-link-dropdow");
  }
 
 

  micliente = new cliente('','','','');
  constructor(private conectarApiService:ConectarApiService,private formBuilder: FormBuilder) {
    this.buildForm();
  }




  ngOnInit() {
    this.activarLinkMenu();
    this.buildForm();

  }

  myForm!: FormGroup;
 
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
    fo_programa: ['',[Validators.required,]],
    acepto: ['',[Validators.required,Validators.requiredTrue]]
    });
  }

  get email() {
    return this.myForm.controls['email'];
}

  get password() {
      return this.myForm.controls['password'];
  }

  agregar(){
    console.log(this.myForm.value);
      this.conectarApiService.insertarCliente(this.myForm.value).subscribe(respuesta=>{
        this.insertarNuevoCliente=respuesta;
        console.log(respuesta);
        if(respuesta>0){
          this.completeLogin();
          alertify.set('notifier','position', 'top-center');
          alertify.success('Registro correcto');   
        }
      }); 

      

  }
  

  completeLogin(){   
    this.myForm.reset();   
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
