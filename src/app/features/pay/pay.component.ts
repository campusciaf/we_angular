

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { PayService } from '@/app/core/services/pay.service';

/** Store */
import { Store } from '@ngrx/store';
import { setUser } from '@/app/state/user.actions';

declare let alertify: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {

  constructor(
    private store: Store,
    private payApiService: PayService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  myForm!: FormGroup;

  account_validation_messages = {
    user_identificacion: [
      { type: 'required', message: 'La identificación es obligatoria' },
      { type: 'minlength', message: 'Debe tener al menos 5 caracteres' },
    ],
    user_credencial: [
      { type: 'required', message: 'La credencial del estudiante es obligatoria' },
    ],
  };

  private buildForm() {
    this.myForm = this.fb.group({
      user_identificacion: ['', [Validators.required, Validators.minLength(5)]],
      user_credencial: ['', [Validators.required]],
    });
  }

  registro() {
    this.myForm.value.action = 'validateStudent';

    this.payApiService.registroInteresado(this.myForm.value).subscribe((data) => {
      if(data.status == "success"){
        alertify.alert('Validación correcta', '¡Ya puedes verificar y realizar los pagos pendientes.!', function(){ alertify.success('Ok'); });
        setTimeout(() => {
          this.store.dispatch(setUser({
            documento: this.myForm.value.user_identificacion,
            credencial: this.myForm.value.user_credencial,
          }));
          this.router.navigate(['/pagos-pendientes']);
        }, 3000);
      }else{
        alertify.set('notifier','position', 'top-center');
        alertify.error('¡Estudiante no encontrado, verifica los datos!'); 
      }
    }, error => {
      alertify.set('notifier','position', 'top-center');
      alertify.error('¡No se puedo validar el estudiante!');
      console.error('Error al registrar interesado:', error);
    });
  }

}
