import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {path: 'emprendimientos', component:EmprendimientosComponent},
  {path: 'emprendimientodetalle/:id', component:EmprendimientodetalleComponent},
  {path: 'egresados', component:EgresadosComponent},
  {path: 'sac', component:SacComponent},
  {path: 'investigaciones', component:InvestigacionesComponent},

  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
