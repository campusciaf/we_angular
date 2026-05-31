import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

declare let alertify: any;

@Component({
  selector: 'app-formularioregistro',
  templateUrl: './formularioregistro.component.html',
  styleUrls: ['./formularioregistro.component.css']
})
export class FormularioregistroComponent implements OnInit {

  insertarNuevoCliente: any;
  myForm!: FormGroup;

  account_validation_messages = {
    nombre: [
      { type: 'required', message: 'Campo de nombre requerido' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 3 caracteres' },
      { type: 'maxlength', message: 'Su nombre no puede tener más de 40 caracteres' }
    ],
    correo: [
      { type: 'required', message: 'Campo de correo requerido' },
      { type: 'email', message: 'Ingresar un correo válido' }
    ],
    celular: [
      { type: 'required', message: 'Campo de celular requerido' },
      { type: 'minlength', message: 'El número debe tener 10 caracteres' },
      { type: 'maxlength', message: 'El número debe tener 10 caracteres' },
      { type: 'pattern', message: 'Solo debe contener números' }
    ],
    acepto: [
      { type: 'required', message: 'Debes aceptar el envío de información' }
    ]
  };

  constructor(
    private conectarApiService: ConectarApiService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.myForm = this.formBuilder.group({
      nombre: ['', {
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
      celular: [null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
        ],
        updateOn: 'blur'
      }],
      fo_programa: ['', [Validators.required]],
      jornada_e: ['', [Validators.required]],
      acepto: ['', [Validators.required, Validators.requiredTrue]]
    });
  }

  agregar(): void {
    this.conectarApiService.insertarCliente(this.myForm.value).subscribe(respuesta => {
      this.insertarNuevoCliente = respuesta;

      if (respuesta > 0) {
        this.completeLogin();
        alertify.set('notifier', 'position', 'top-center');
        alertify.success('Registro correcto');
      }
    });
  }

  completeLogin(): void {
    this.myForm.reset();
  }
}
