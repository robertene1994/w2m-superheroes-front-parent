import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para las operaciones relacionadas con el spinner. Este es
 * utilizado por la aplicación durante la realización de las operaciones
 * que requiere cierto tiempo de ejecución.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    console.log('SpinnerService');
  }

  getSpinnerStatus() {
    return this.spinnerSubject;
  }

  changeSpinnerStatus(valor: boolean) {
    this.spinnerSubject.next(valor);
  }
}
