import { Component } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var jQuery:any;
declare var $:any;
declare let alertify: any;


@Component({
  selector: 'app-referidos',
  templateUrl: './referidos.component.html',
  styleUrls: ['./referidos.component.css']
})
export class ReferidosComponent {

  public imprime="assets/referidos/imprime_futuro.webp";
  public logo="assets/referidos/ciaf.webp";

  constructor(private conectarApiService:ConectarApiService,private formBuilder: FormBuilder) {
    this.buildForm();
  }


  private buildForm(){
    this.myForm = this.formBuilder.group({

    nombre_r:['',{
      validators: [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(40)
      ],
      updateOn: 'blur'
    }],
      
    celular_r:[null,{
        validators: [
          Validators.required, 
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          
      ],
      updateOn: 'blur'
      }],

    relacion: ['',[Validators.required,]],
      
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

      fo_programa: ['',[Validators.required,]],
      jornada_e: ['',[Validators.required,]],
      acepto: [false, Validators.requiredTrue]
      });
  }


  myForm!: FormGroup;
  insertarReferido: any;

  agregar(){
      this.conectarApiService.insertarReferido(this.myForm.value).subscribe(respuesta=>{
        this.insertarReferido=respuesta;
        if(respuesta>0){
          this.completeLogin();
          alertify.set('notifier','position', 'top-center');
          alertify.success('¡Gracias por tu participación, sigue inspirando a tus amigos!');   
        }
      }); 
  }

  account_validation_messages = {
    'nombre_r': [
      { type: 'required', message: 'Campo de nombre requerido' },
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

    'celular': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],
    'celular_r': [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'maxlength', message: 'El numero debe terner 10 caracteres' },
      { type: 'pattern', message: 'solo debe contener numeros' }

    ],

    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  programas = [
      { valor: "Nivel 1 - Técnico Profesional en Procesos Empresariales", texto: "Administración de Empresas" },
      { valor: "Técnica Profesional en Gestión Financiera", texto: "Contaduría Pública" },
      { valor: "Nivel 1 - Técnica profesional en programación de software", texto: "Ingeniería de desarrollo de software" },
      { valor: "Nivel 1 - Técnico Profesional en Logística de Producción", texto: "Ingeniería Industrial" },
      { valor: "Nivel 1 - Técnico Profesional en Procesos de Seguridad y Salud en el Trabajo", texto: "Seguridad y salud en el trabajo (SSTG)" },
      { valor: "Técnico laboral por competencias en mecánica de motocicletas", texto: "Mecánica y mantenimiento de motocicletas" },
      { valor: "Técnico laboral por competencias en auxiliar en enfermería", texto: "Auxiliar enfermería" },
      { valor: "Técnico Laboral por Competencias en Administrativo en Salud", texto: "Auxiliar administrativo en salud" },
      { valor: "Técnico laboral por competencias en auxiliar de veterinaria y cuidado de mascotas", texto: "Auxiliar veterinaria" },
  ];

  jornadas = [
    { valor: "D01", texto: "Diurna" },
    { valor: "N01", texto: "Nocturna" },
    { valor: "Fds", texto: "Finde semana" },
    { valor: "S01", texto: "Sábados" },

  ];

  cargos = [
    { valor: "docente", texto: "Docente" },
    { valor: "egresado", texto: "Egresado" },
    { valor: "estudiante", texto: "Estudiante" },
    { valor: "administrativo", texto: "Administrativo" },
    { valor: "externo", texto: "Externo" },

  ];

  
  completeLogin(){   
    this.myForm.reset();   
  }



  


}


