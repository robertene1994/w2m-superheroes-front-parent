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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperheroesRoutingModule {}
