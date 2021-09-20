import { Injectable } from '@angular/core';

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
