import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuperheroesComponent } from './superheroes/superheroes.component';

const routes: Routes = [
  {
    path: 'superheroes',
    children: [
      {
        path: 'superheroes',
        component: SuperheroesComponent,
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
