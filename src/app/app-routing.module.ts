import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guards';

import { InicioComponent } from './componente/inicio/inicio.component';
import { AdministracionComponent } from './componente/administracion/administracion.component';
import { IngSoftwareComponent } from './componente/ing-software/ing-software.component';
import { ContaduriaComponent } from './componente/contaduria/contaduria.component';
import { ContinuadaComponent } from './componente/continuada/continuada.component';
import { BienestarComponent } from './componente/bienestar/bienestar.component';
import { SstComponent } from './componente/sst/sst.component';
import { IndustrialComponent } from './componente/industrial/industrial.component';
import { PageNotFoundComponent } from './componente/page-not-found/page-not-found.component';
import { ContinuadaDetalleComponent } from './componente/continuada-detalle/continuada-detalle.component';
import { EnfermeriaComponent } from './componente/enfermeria/enfermeria.component';
import { ConocenosComponent } from './componente/conocenos/conocenos.component';
import { MotocicletasComponent } from './componente/motocicletas/motocicletas.component';
import { AdministrativosaludComponent } from './componente/administrativosalud/administrativosalud.component';
import { EmprendimientosComponent } from './componente/emprendimientos/emprendimientos.component';
import { EmprendimientodetalleComponent } from './componente/emprendimientodetalle/emprendimientodetalle.component';
import { EgresadosComponent } from './componente/egresados/egresados.component';
import { SacComponent } from './componente/sac/sac.component';
import { InvestigacionesComponent } from './componente/investigaciones/investigaciones.component';
import { RelacionExternoComponent } from './componente/relacion-externo/relacion-externo.component';
import { NoticiasComponent } from './componente/noticias/noticias.component';
import { BlogComponent } from './componente/blog/blog.component';
import { HorariosComponent } from './componente/horarios/horarios.component';
import { TratamientodatosComponent } from './componente/tratamientodatos/tratamientodatos.component';
import { VeterinariaComponent } from './componente/veterinaria/veterinaria.component';
import { AdultomayorComponent } from './componente/adultomayor/adultomayor.component';
import { ExpoUComponent } from './landing/expo-u/expo-u.component';
import { PermanenciaComponent } from './componente/permanencia/permanencia.component';
import { BienestarnoticiasComponent } from './componente/bienestarnoticias/bienestarnoticias.component';
import { CvadministrativoComponent } from './componente/cvadministrativo/cvadministrativo.component';
import { IniciarComponent } from './componente/inscripcion/iniciar/iniciar.component';
import { OndashboardComponent } from './componente/inscripcion/ondashboard/ondashboard.component';
import { OnloginComponent } from './componente/inscripcion/onlogin/onlogin.component';
import { ReferidosComponent } from './componente/referidos/referidos.component';




const routes: Routes = [
  {path: '', redirectTo:'inicio' , pathMatch:'full'},
  {path: 'inicio', component:InicioComponent},
  {path: 'administracion', component:AdministracionComponent},
  {path: 'software', component:IngSoftwareComponent},
  {path: 'contaduria', component:ContaduriaComponent},
  {path: 'sst', component:SstComponent},
  {path: 'industrial', component:IndustrialComponent},
  {path: 'enfermeria', component:EnfermeriaComponent},
  {path: 'continuada', component:ContinuadaComponent},
  {path: 'continuadadetalle/:id', component:ContinuadaDetalleComponent},
  {path: 'bienestar', component:BienestarComponent},
  {path: 'conocenos', component:ConocenosComponent},
  {path: 'motocicletas', component:MotocicletasComponent},
  {path: 'administrativo', component:AdministrativosaludComponent},
  {path: 'veterinaria', component:VeterinariaComponent},
  {path: 'adultomayor', component:AdultomayorComponent},
  {path: 'emprendimientos', component:EmprendimientosComponent},
  {path: 'emprendimientodetalle/:id', component:EmprendimientodetalleComponent},
  {path: 'egresados', component:EgresadosComponent},
  {path: 'sac', component:SacComponent},
  {path: 'investigaciones', component:InvestigacionesComponent},
  {path: 'relacion-externo', component:RelacionExternoComponent},
  {path: 'noticias', component:NoticiasComponent},
  {path: 'noticias/:id', component:NoticiasComponent},
  {path: 'bienestarnoticias', component:BienestarnoticiasComponent},
  {path: 'cvadministrativos', component:CvadministrativoComponent},
  {path: 'referidos', component:ReferidosComponent},

 
  {path: 'iniciar', component:IniciarComponent},
  {path: 'onlogin', component:OnloginComponent},
  {path: 'ondashboard', component:OndashboardComponent, canActivate:[LoginGuard]},
  
  
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:id', component:BlogComponent},
 
  {path: 'tratamientodatos', component:TratamientodatosComponent},
  {path: 'horarios', component:HorariosComponent},
  {path: 'permanencia', component:PermanenciaComponent},

  /* **** landing pages **** */
  {path: 'expo-u', component:ExpoUComponent},
  {path: '**', component:PageNotFoundComponent},

 

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
