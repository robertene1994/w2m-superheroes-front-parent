import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}

  private spinnerSubject = new BehaviorSubject<boolean>(false);

  getSpinnerStatus() {
    return this.spinnerSubject;
  }

  changeSpinnerStatus(valor: boolean) {
    this.spinnerSubject.next(valor);
  }
}
