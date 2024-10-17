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

  user_identificacion: string | undefined;
  user_password: string | undefined;
  constructor(
    private conectarApiService:ConectarApiService,
    private fb: FormBuilder,
    private router:Router
  ) {

  }



  registro() {
    // const user = { user_email: this.user_email, user_password: this.user_password, repeat_password: this.repeat_password };
    // this.conectarApiService.registro(user).subscribe((data) => {
    // console.log(data)
    //   if(data.status == "ok"){
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Registro correcto" ,
    //       showConfirmButton: false,
    //       timer: 2500
    //     });
    //     this.router.navigate(['/login']);
        
    //   }else{
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "warning",
    //       title: data.result.error_msg ,
    //       showConfirmButton: false,
    //       timer: 2500
    //     });
    //   }
    // });
  }


}
