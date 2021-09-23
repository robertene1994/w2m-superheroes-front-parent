import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SessionService } from '../services/session.service';

/**
 * Servicio para la autenticaciónde los usuarios de la aplicación para
 * cada una de las rutas/pantallas disponibles.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {
    console.log('AuthGuard');
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('Route (URL): ', state.url);

    return this.sessionService.isAuthenticated().pipe(
      switchMap((isAuth) => {
        console.log('Usuario autenticado (Token válido): ', isAuth);
        if (!!isAuth) {
          return of(true);
        } else {
          this.sessionService.logout();
          this.router.navigate(['/auth/login'], {
            queryParams: { expiredSession: true },
          });
          return of(false);
        }
      })
    );
  }
}
