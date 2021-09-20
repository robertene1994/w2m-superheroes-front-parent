import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CommonsServicesModule } from 'commons-services';

import { SuperheroesRoutingModule } from './superheroes-routing.module';

import { SuperheroesComponent } from './superheroes/superheroes.component';

@NgModule({
  declarations: [SuperheroesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SuperheroesRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonsServicesModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [],
})
export class SuperheroesModule {}
