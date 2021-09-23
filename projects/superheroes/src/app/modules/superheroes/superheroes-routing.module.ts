import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuperheroesComponent } from './superheroes/superheroes.component';
import { CreateOrUpdateSuperheroComponent } from './create-or-update-superhero/create-or-update-superhero.component';

const routes: Routes = [
  {
    path: 'superheroes',
    children: [
      {
        path: 'superheroes',
        component: SuperheroesComponent,
      },
      {
        path: 'superheroes/create',
        component: CreateOrUpdateSuperheroComponent,
      },
      {
        path: 'superheroes/:id',
        component: CreateOrUpdateSuperheroComponent,
      },
    ],
  },
];

/**
 * Descriptor que define las rutas del submódulo `superheroes`.
 *
 * @author Robert Ene
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperheroesRoutingModule {}
