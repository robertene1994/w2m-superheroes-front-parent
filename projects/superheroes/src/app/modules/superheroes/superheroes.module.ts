import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsServicesModule } from 'commons-services';
import { CommonsUiModule, AngularMaterialModule } from 'commons-ui';

import { SuperheroesRoutingModule } from './superheroes-routing.module';

import { SuperheroesComponent } from './superheroes/superheroes.component';

/**
 * Descriptor del submódulo `superheroes`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [SuperheroesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperheroesRoutingModule,
    CommonsServicesModule,
    CommonsUiModule,
    AngularMaterialModule,
  ],
  exports: [],
  providers: [],
})
export class SuperheroesModule {}
