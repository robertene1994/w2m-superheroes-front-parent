import { Injectable } from '@angular/core';

/**
 * Servicio para la gestión del entorno (environment) de toda la aplicación
 * y las variables asociadas al mismo.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private _environment: any;

  set environment(object: any) {
    this._environment = object;
  }

  get environment() {
    return this._environment;
  }

  get urlBase() {
    return this.environment.urlBase || '/api';
  }
}
