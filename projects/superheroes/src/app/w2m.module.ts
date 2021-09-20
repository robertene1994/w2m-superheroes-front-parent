import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { NgxSpinnerModule } from 'ngx-spinner';

import { EnvironmentService } from 'commons-services';
import {
  AngularMaterialModule,
  AuthInterceptor,
  HttpErrorInterceptor,
  SpinnerModule,
} from 'commons-ui';

import { environment } from '../environments/environment';

import { W2mRoutingModule } from './w2m-routing.module';
import { W2mComponent } from './ui/w2m.component';

@NgModule({
  declarations: [W2mComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    W2mRoutingModule,
    NgxSpinnerModule,
    AngularMaterialModule,
    SpinnerModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
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
