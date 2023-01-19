import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/clases/cliente';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
 
  form!: FormGroup;

  micliente = new cliente('','','','');
  constructor(private conectarApiService:ConectarApiService,private formBuilder: FormBuilder) {
    this.buildForm();
  }




  ngOnInit() {
    this.activarLinkMenu();

  }


  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: [0, Validators.min(18)],
      correo: [0, Validators.min(18)],
      celular: [0, Validators.min(18)],
     
    })
  }


  agregar(){
    console.log(this.form.value);
      // this.conectarApiService.insertarCliente(this.micliente).subscribe(respuesta=>{
      //   this.insertarNuevoCliente=respuesta;
      // }); 

  }


}
