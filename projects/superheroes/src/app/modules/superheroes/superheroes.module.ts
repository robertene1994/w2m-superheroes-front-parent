import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuperheroesRoutingModule } from './superheroes-routing.module';

import { CommonsServicesModule } from 'commons-services';
import { CommonsUiModule, AngularMaterialModule } from 'commons-ui';

import { SuperheroesComponent } from './superheroes/superheroes.component';
import { CreateOrUpdateSuperheroComponent } from './create-or-update-superhero/create-or-update-superhero.component';

/**
 * Descriptor del submódulo `superheroes`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [SuperheroesComponent, CreateOrUpdateSuperheroComponent],
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
