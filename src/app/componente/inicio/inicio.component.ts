import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/clases/cliente';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  creatividadPic:Array<any> =[
    {imagen:'assets/image/emprendimientos.webp',titulo:'Vitrina de Emprendimientos'},
    {imagen:'assets/image/pereira4ri.webp',titulo:'Pereira 4RI '},
    {imagen:'assets/image/hub.webp',titulo:'HUB de la Creatividad'},
    {imagen:'assets/image/memorias-institucionales.webp',titulo:'Memorias Institucionales'},
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
    celular: ['', [Validators.required, Validators.minLength(11)]],
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
      // this.conectarApiService.insertarCliente(this.myForm.value).subscribe(respuesta=>{
      //   this.insertarNuevoCliente=respuesta;
      // }); 

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
      { type: 'pattern', message: 'Enter a valid email' }
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
