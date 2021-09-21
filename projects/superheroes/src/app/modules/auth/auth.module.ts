import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsServicesModule } from 'commons-services';
import { CommonsUiModule, AngularMaterialModule } from 'commons-ui';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';

/**
 * Descriptor del submódulo `auth`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonsServicesModule,
    CommonsUiModule,
    AngularMaterialModule,
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
