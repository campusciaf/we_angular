import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import YouTubePlayer from 'youtube-player';

/* Idioma del proyecto */
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
/* ********************* */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

/* import para el slick */
import { SlickCarouselModule } from 'ngx-slick-carousel';
/* ************************ */

/* modulo parael multiselect */
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
/* ************************ */



import { CalidadycrecimientoComponent } from './componente/calidadycrecimiento/calidadycrecimiento.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { HeaderComponent } from './componente/header/header.component';
import { FooterComponent } from './componente/footer/footer.component';
import { SlidehomeComponent } from './componente/slidehome/slidehome.component';
import { NoticiasComponent } from './componente/noticias/noticias.component';
import { AliadosComponent } from './componente/aliados/aliados.component';
import { PageNotFoundComponent } from './componente/page-not-found/page-not-found.component';
import { AdministracionComponent } from './componente/administracion/administracion.component';
import { ContaduriaComponent } from './componente/contaduria/contaduria.component';
import { BienestarComponent } from './componente/bienestar/bienestar.component';
import { ContinuadaComponent } from './componente/continuada/continuada.component';
import { SstComponent } from './componente/sst/sst.component';
import { IndustrialComponent } from './componente/industrial/industrial.component';
import { IngSoftwareComponent } from './componente/ing-software/ing-software.component';
import { EventosComponent } from './componente/eventos/eventos.component';
import { ContinuadaDetalleComponent } from './componente/continuada-detalle/continuada-detalle.component';
import { EnfermeriaComponent } from './componente/enfermeria/enfermeria.component';





@NgModule({
  declarations: [
    AppComponent,
    CalidadycrecimientoComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    SlidehomeComponent,
    NoticiasComponent,
    AliadosComponent,
    PageNotFoundComponent,
    AdministracionComponent,
    ContaduriaComponent,
    BienestarComponent,
    ContinuadaComponent,
    SstComponent,
    IndustrialComponent,
    IngSoftwareComponent,
    EventosComponent,
    ContinuadaDetalleComponent,
    EnfermeriaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    
   
    

    
 

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } /*idioma del proyecto */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
