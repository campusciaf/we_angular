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

const routes: Routes = [
  {path: '', redirectTo:'inicio' , pathMatch:'full'},
  {path: 'inicio', component:InicioComponent},
  {path: 'administracion', component:AdministracionComponent},
  {path: 'software', component:IngSoftwareComponent},
  {path: 'contaduria', component:ContaduriaComponent},
  {path: 'continuada', component:ContinuadaComponent},
  {path: 'continuadadetalle/:id', component:ContinuadaDetalleComponent},
  {path: 'bienestar', component:BienestarComponent},
  {path: 'sst', component:SstComponent},
  {path: 'industrial', component:IndustrialComponent},
  {path: 'enfermeria', component:EnfermeriaComponent},

  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
