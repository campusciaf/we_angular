import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConectarApiService } from 'src/app/servicios/conectar-api.service';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery:any;
declare var $:any;
declare let alertify: any;


@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent {
  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any> | undefined;

  public logo_pc="assets/image/egresados_pc.webp";
  public logo_m="assets/image/egresados_m.webp";
  public club_egresados="assets/image/club-egresados.webp";
  public testimonio_egresado_1="assets/image/testimonio-egresado-1.webp";
  public testimonio_egresado_2="assets/image/testimonio-egresado-2.webp";
  public testimonio_egresado_3="assets/image/testimonio-egresado-3.webp";
  
  pagina:any;
  activo:any;

  isValid0:boolean = false;
  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;
  
    paginas(pagina:string){

      if(pagina == "0"){
        this.isValid0= true;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,0);

        
      }
  
      if(pagina == "1"){
        this.isValid0= false;
        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,0);

        $("#btn-1").addClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").addClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");

      }
      
      if(pagina == "2"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= true;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);

        
        $("#btn-1").removeClass("active");
        $("#btn-2").addClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").addClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");


      }
      
      if(pagina == "3"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= true;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").addClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").addClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }
      
      if(pagina == "4"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= true;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").addClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").addClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }
      if(pagina == "5"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= true;
        this.isValid6= false;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").addClass("active");
        $("#btn-6").removeClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").addClass("active-m");
        $("#btn-6-1").removeClass("active-m");
      }

      if(pagina == "6"){
        this.isValid0= false;
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= true;
        window.scroll(0,280);

        $("#btn-1").removeClass("active");
        $("#btn-2").removeClass("active");
        $("#btn-3").removeClass("active");
        $("#btn-4").removeClass("active");
        $("#btn-5").removeClass("active");
        $("#btn-6").addClass("active");
  
        $("#btn-1-1").removeClass("active-m");
        $("#btn-2-1").removeClass("active-m");
        $("#btn-3-1").removeClass("active-m");
        $("#btn-4-1").removeClass("active-m");
        $("#btn-5-1").removeClass("active-m");
        $("#btn-6-1").addClass("active-m");
      }
  
    }
  
    constructor(
      private conectarApiService:ConectarApiService,
      private formBuilder: FormBuilder,
      private modalService: NgbModal,
    ) { 

      this.myForm = this.formBuilder.group({
        id_credencial: ['', [Validators.required, Validators.minLength(8)]],
      });

    }
  
    ngOnInit(): void {
      this.activo="0";
      this.pagina="1";
      this.paginas(this.pagina);
      // this.modalService.open(this.myModalInfo);
    }


    myForm:FormGroup;
    verificarNumeroEgresado:any;
    numericValue: any | undefined;
    $id_credencial:any;
    $nombre:any;
    element1 = true;
    element = false;
    datosUsuario:any;

    

    captureValue() {

        this.conectarApiService.verificarEgresado(this.numericValue).subscribe(respuesta=>{
        this.verificarNumeroEgresado=respuesta;
        
        if(respuesta.length > 0){
          this.$id_credencial=respuesta[0].id_credencial;
          this.$nombre=respuesta[0].credencial_nombre;
          alertify.set('notifier','position', 'top-center');
          alertify.success(this.$nombre + ' Puede actualizar datos');   

            this.conectarApiService.verificarRegistro(this.$id_credencial).subscribe(respuesta2=>{
              this.datosUsuario=respuesta2;
              if(respuesta.length >= 1){
                this.element1 = false;
                this.element=true;

                this.myForm = new FormGroup({
                  'id_credencial': new FormControl(this.$id_credencial),
                  'egresados_tiene_hijos': new FormControl(this.datosUsuario[0]["egresados_tiene_hijos"]),
                  'egresados_num_hijos': new FormControl(this.datosUsuario[0]["egresados_num_hijos"]),
                  'egresados_trabaja': new FormControl(this.datosUsuario[0]["egresados_trabaja"]),
                  'egresados_tipo_trabajador': new FormControl(this.datosUsuario[0]["egresados_tipo_trabajador"]),
                  'egresados_empresa': new FormControl(this.datosUsuario[0]["egresados_empresa"]),
                  'egresados_sector_empresa': new FormControl(this.datosUsuario[0]["egresados_sector_empresa"]),
                  'egresados_cargo': new FormControl(this.datosUsuario[0]["egresados_cargo"]),
                  'egresados_profesion': new FormControl(this.datosUsuario[0]["egresados_profesion"]),
                  'egresados_salario': new FormControl(this.datosUsuario[0]["egresados_salario"]),
                  'egresados_estudio_adicional': new FormControl(this.datosUsuario[0]["egresados_estudio_adicional"]),
                  'egresados_formacion': new FormControl(this.datosUsuario[0]["egresados_formacion"]),
                  'egresados_tipo_formacion': new FormControl(this.datosUsuario[0]["egresados_tipo_formacion"]),
                  'egresados_informacion': new FormControl(this.datosUsuario[0]["egresados_informacion"]),
                  'egresados_posgrado': new FormControl(this.datosUsuario[0]["egresados_posgrado"]),
                  'egresados_colaborativa': new FormControl(this.datosUsuario[0]["egresados_colaborativa"]),
                  'egresados_actualizacion': new FormControl(this.datosUsuario[0]["egresados_actualizacion"]),
                  'egresados_recomendar': new FormControl(this.datosUsuario[0]["egresados_recomendar"]),

                }); 
                this.organizarformulario();
              }
            }); 

        }else{
          alertify.set('notifier','position', 'top-center');
          alertify.error('No se encuentra en base de datos');   
        }
      }); 
    }
  
    actualizar(){
      const datos = { 
        id_credencial: this.myForm.value.id_credencial,
        egresados_tiene_hijos: this.myForm.value.egresados_tiene_hijos,
        egresados_num_hijos: this.myForm.value.egresados_num_hijos,
        egresados_trabaja: this.myForm.value.egresados_trabaja,
        egresados_tipo_trabajador: this.myForm.value.egresados_tipo_trabajador,
        egresados_empresa: this.myForm.value.egresados_empresa,
        egresados_sector_empresa: this.myForm.value.egresados_sector_empresa,
        egresados_cargo: this.myForm.value.egresados_cargo,
        egresados_profesion: this.myForm.value.egresados_profesion,
        egresados_salario: this.myForm.value.egresados_salario,
        egresados_estudio_adicional: this.myForm.value.egresados_estudio_adicional,
        egresados_formacion: this.myForm.value.egresados_formacion,
        egresados_tipo_formacion: this.myForm.value.egresados_tipo_formacion,
        egresados_informacion: this.myForm.value.egresados_informacion,
        egresados_posgrado: this.myForm.value.egresados_posgrado,
        egresados_colaborativa: this.myForm.value.egresados_colaborativa,
        egresados_actualizacion: this.myForm.value.egresados_actualizacion,
        egresados_recomendar: this.myForm.value.egresados_recomendar,
      };

      
      this.conectarApiService.actualizarEgresado(datos).subscribe(respuesta=>{
        this.verificarNumeroEgresado=respuesta;
        if(respuesta.status == "ok"){
 
          alertify.set('notifier','position', 'top-center');
          alertify.success('Registro correcto');  
          this.element1 = true;
          this.element=false; 
          this.numericValue='';
        }else{
          alertify.set('notifier','position', 'top-center');
          alertify.error('Error'); 
        }
      }); 
    }

    account_validation_messages = {
      'id_credencial': [
        { type: 'required', message: 'Campo numero de identificación' },
        { type: 'minlength', message: 'Su documento debe tener al menos 8 caracteres' },
        { type: 'maxlength', message: 'Su nombre no puede tener más de 10 caracteres' },
        { type: 'pattern', message: 'Su nombre debe contener solo numeros' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_tiene_hijos': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_trabaja': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_estudio_adicional': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'minlength', message: 'Su documento debe tener al menos 10 caracteres' },
        { type: 'maxlength', message: 'Su nombre no puede tener más de 150 caracteres' },
      ],
      'egresados_formacion': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_informacion': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_posgrado': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_colaborativa': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_actualizacion': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],
      'egresados_recomendar': [
        { type: 'required', message: 'Campo de selección' },
        { type: 'validUsername', message: 'Your username has already been taken' }
      ],

    }

    campo1:any;
    campo3:any;
    campo11:any;

    element2 = true;

    element4 = true;
    element5 = true;
    element6 = true;
    element7 = true;
    element8 = true;
    element9 = true;

    element12 = true;
    
    organizarformulario(){
      //pregunta si tiene hijos
      this.campo1=this.myForm.value.egresados_tiene_hijos;
      if(this.campo1=="no"){
       this.element2=true;
      }else{
        this.element2=false;
      }
      // *****************
      this.campo3=this.myForm.value.egresados_trabaja;
      if(this.campo3=="no"){
        this.element4=true;
        this.element5=true;
        this.element6=true;
        this.element7=true;
        this.element8=true;
        this.element9=true;
       }else{
         this.element4=false;
         this.element5=false;
         this.element6=false;
         this.element7=false;
         this.element8=false;
         this.element9=false;
       }

       this.campo11=this.myForm.value.egresados_formacion;
       if(this.campo11=="no"){
        this.element12=true;
       }else{
         this.element12=false;
       }
       // *****************
       console.log(this.campo11);
    }

    mostrarcampo(valor:any){
      //pregunta si tiene hijos
      if(valor==1){
          this.campo1=this.myForm.value.egresados_tiene_hijos;
          if(this.campo1=="no"){
            this.element2=true;
          }else{
            this.element2=false;
          }
      }
      // *****************
      if(valor==3){
        this.campo3=this.myForm.value.egresados_trabaja;
        if(this.campo3=="no"){
          this.element4=true;
          this.element5=true;
          this.element6=true;
          this.element7=true;
          this.element8=true;
          this.element9=true;
        }else{
          this.element4=false;
          this.element5=false;
          this.element6=false;
          this.element7=false;
          this.element8=false;
          this.element9=false;
        }
    }
    // *****************

    if(valor==11){
      this.campo11=this.myForm.value.egresados_formacion;
      if(this.campo11=="no"){
        this.element12=true;
      }else{
        this.element12=false;
      }
  }
  // *****************


    }

    mostrarModalInfo(){
      this.element1 = true;
      this.element=false;
      this.modalService.open(this.myModalInfo, { centered: true });
      this.numericValue='';
      
      
    }
  
}
 