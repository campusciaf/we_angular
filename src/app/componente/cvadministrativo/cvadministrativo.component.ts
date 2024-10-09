import { Component} from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let alertify: any;

@Component({
  selector: 'app-cvadministrativo',
  templateUrl: './cvadministrativo.component.html',
  styleUrls: ['./cvadministrativo.component.css']
})
export class CvadministrativoComponent {

  insertarNuevoCliente:any;
  listadependencias: any;

  constructor(private conectarApiService:ConectarApiService,private formBuilder: FormBuilder) {
    this.buildForm();
  }

  myForm!: FormGroup;
  selectedFile: File | any;
  
  private buildForm(){
    this.myForm = this.formBuilder.group({
      identificacion:['',{
        validators: [
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(11)
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
    cargo: ['',[Validators.required,]],
    pdf: ['',[Validators.required,]],
    acepto: ['',[Validators.required,Validators.requiredTrue]]
    });
  }

  ngOnInit() {

    this.conectarApiService.dependencias().subscribe(respuesta=>{
      this.listadependencias=respuesta;
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  agregar(){
    
    const formData = new FormData();
    
    formData.append('identificacion', this.myForm.value.identificacion); 
    formData.append('nombre', this.myForm.value.nombre); 
    formData.append('correo', this.myForm.value.correo); 
    formData.append('celular', this.myForm.value.celular); 
    formData.append('cargo', this.myForm.value.cargo); 
    formData.append('file', this.selectedFile);

      this.conectarApiService.insertarCVadmin(formData).subscribe(respuesta=>{
        this.insertarNuevoCliente=respuesta;
        
          if(respuesta == 'Existe'){
            alertify.set('notifier','position', 'top-center');
            alertify.error('Existe un usuario con esos datos');   
          }else if(respuesta == 'pdf'){
            alertify.set('notifier','position', 'top-center');
            alertify.error('Formato de la hoja de vida debe ser PDF');   
          }else{
            alertify.set('notifier','position', 'top-center');
            alertify.success('Registro correcto'); 
            this.clearForm();
          }     
      }); 
  }

  clearForm() {
    this.myForm .reset({
          'identificacion': '',
          'nombre': '',
          'correo': '',
          'celular': '',
          'cargo': '',
          'pdf': ''
         });
    }

  account_validation_messages = {
    'identificacion': [
      { type: 'required', message: 'Campo de identificación requerido' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'Su nombre no puede tener más de 33 caracteres' },
      { type: 'pattern', message: 'Su nombre debe contener solo letras' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
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
      { type: 'required', message: 'Campo de número requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    'cargo': [
      { type: 'required', message: 'Seleccionar el cargo para postulación' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ], 
    'pdf': [
      { type: 'required', message: 'Debes subir la hoja de vida en formato PDF' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],

    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
    }

}
