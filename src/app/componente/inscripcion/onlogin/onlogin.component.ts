import { Component } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

declare var $:any;
declare let alertify: any;

@Component({
  selector: 'app-onlogin',
  templateUrl: './onlogin.component.html',
  styleUrls: ['./onlogin.component.css']
})
export class OnloginComponent {

  user_identificacion: string | undefined;
  user_password: string | undefined;
  constructor(
    private conectarApiService:ConectarApiService,
    private fb: FormBuilder,
    private router:Router
  ) {

  }

  login() {

    const user = { user_identificacion: this.user_identificacion, user_password: this.user_password };

    this.conectarApiService.login(user).subscribe((data) => {
      if(data.status == "ok"){
        localStorage.setItem('token',data.result.token)
        localStorage.setItem('idnum',data.result.idnum)
        this.router.navigate(['ondashboard']);
        alertify.success('Ingreso correcto');  
      }else{

        alertify.error('Acceso denegado');  
      }
    });


  }

}
