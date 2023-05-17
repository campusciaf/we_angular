import { Component } from '@angular/core';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent {
  public bg_pc="assets/image/conocenos-pc.webp";
  public bg_m="assets/image/conocenos-m.webp";

  pagina:any;
  activo:any;

  isValid1:boolean = false;
  isValid2:boolean = false;
  isValid3:boolean = false;
  isValid4:boolean = false;
  isValid5:boolean = false;
  isValid6:boolean = false;
  
    paginas(pagina:string){

  
      if(pagina == "1"){

        this.isValid1= true;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);
      }
      
      if(pagina == "2"){
 
        this.isValid1= false;
        this.isValid2= true;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
        window.scroll(0,280);
      }
      
      if(pagina == "3"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= true;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= false;
      }
      
      if(pagina == "4"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= true;
        this.isValid5= false;
        this.isValid6= false;
      }
      if(pagina == "5"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= true;
        this.isValid6= false;
      }
      if(pagina == "6"){
        this.isValid1= false;
        this.isValid2= false;
        this.isValid3= false;
        this.isValid4= false;
        this.isValid5= false;
        this.isValid6= true;
      }
  
    }

    ngOnInit(): void {
      this.activo="1";
      this.pagina="1";
      this.paginas(this.pagina);

    }
  

}
