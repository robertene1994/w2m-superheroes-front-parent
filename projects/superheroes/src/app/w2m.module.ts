import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { CommonsServicesModule, EnvironmentService } from 'commons-services';
import {
  CommonsUiModule,
  AngularMaterialModule,
  AuthInterceptor,
  HttpErrorInterceptor,
} from 'commons-ui';

import { environment } from '../environments/environment';

import { W2mRoutingModule } from './w2m-routing.module';
import { W2mComponent } from './ui/w2m.component';

/**
 * Descriptor del módulo principal de la aplicación.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [W2mComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    W2mRoutingModule,
    CommonsServicesModule,
    CommonsUiModule,
    AngularMaterialModule,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
  bootstrap: [W2mComponent],
})
export class W2mModule {
  constructor(private environmentService: EnvironmentService) {
    environmentService.environment = environment;
    console.log('URL Base: ', this.environmentService.urlBase);
  }
}
