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

import { SessionService } from '../session/session.service';

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
        return !!isAuth ? of(true) : of(false);
      })
    );
  }
}
