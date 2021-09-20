import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { ErrorInfo, SpinnerService } from 'commons-services';

import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private numSpinnerShows = 0;
  private excludedUrls = [];

  constructor(
    private spinnerService: SpinnerService,
    private snackBarService: SnackBarService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.spinnerExcludedUrl(request.url)) {
      this.numSpinnerShows = this.numSpinnerShows + 1;
      this.spinnerService.changeSpinnerStatus(true);
      this.numSpinnerShows =
        this.numSpinnerShows < 0 ? 1 : this.numSpinnerShows;
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => event,
        (response) => this.defaultHttpErrorHandler(response)
      ),
      finalize(() => {
        if (!this.spinnerExcludedUrl(request.url)) {
          this.numSpinnerShows = this.numSpinnerShows - 1;
          if (this.numSpinnerShows <= 0) {
            this.spinnerService.changeSpinnerStatus(false);
          }
        }
      })
    );
  }

  defaultHttpErrorHandler(response: HttpErrorResponse): void {
    console.log('HTTP Error handler');
    let message: string;
    if (response.error && response.error.message) {
      const errorInfo: ErrorInfo = response.error;
      if (errorInfo.message) {
        message = errorInfo.message;
      }
      if (response.status === 401 && errorInfo.code === 1002) {
        message = '¡El usuario y/o la contraseña son inválidos!';
      } else if (response.status === 401 && errorInfo.code === 1003) {
        message = '¡El token JWT es inválido!';
      }
    } else if (!navigator.onLine) {
      message = '¡No existe conexión a Internet!';
    } else if (response.status === 403) {
      message = '¡No tiene acceso a este recurso!';
    } else {
      if (
        response.status === 200 ||
        (response.status >= 400 && response.status <= 500)
      ) {
        message = `¡Error no esperado accediendo al servidor [HTTP: ${response.status}]!`;
        console.error(response.error);
      } else {
        message =
          '¡El servidor no está disponible en estos momentos! ¡Por favor, pruebe más tarde!';
      }

      message = `Error no esperado: ${message}`;
    }

    this.snackBarService.showMessage(message);
    console.error(`${message}. HTTP STATUS: ${response.status}`);
  }

  private spinnerExcludedUrl(url: string): boolean {
    return this.excludedUrls.includes(url);
  }
}
