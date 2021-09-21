import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'commons-services';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/superheroes/superheroes.module').then(
            (m) => m.SuperheroesModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];

/**
 * Módulo que define las principales rutas de la aplicación e implementa la
 * carga diferida (lazy loading) para los diferentes submódulos.
 *
 * @author Robert Ene
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class W2mRoutingModule {}
