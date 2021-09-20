import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { SessionService } from 'commons-services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly AUTH_HEADER: string = 'Authorization';

  constructor(private sessionService: SessionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type') && !req.headers.has('enctype')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    req = req.clone({
      headers: req.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache'),
    });

    const token = this.sessionService.token;
    if (token && !req.headers.has(this.AUTH_HEADER)) {
      req = req.clone({
        headers: req.headers.set(this.AUTH_HEADER, `Bearer ${token}`),
      });
    }

    return next.handle(req);
  }
}
