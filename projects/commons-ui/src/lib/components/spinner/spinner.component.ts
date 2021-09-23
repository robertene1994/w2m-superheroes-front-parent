import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { SpinnerService } from 'commons-services';

/**
 * Componente que tiene la responsabilidad de gestionar el cliclo de
 * vida del spinner de la aplicación.
 *
 * @author Robert Ene
 */
@Component({
  selector: 'w2m-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private spinnerService: SpinnerService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const sub = this.spinnerService
      .getSpinnerStatus()
      .pipe(delay(0))
      .subscribe((isLoading) => {
        if (isLoading) {
          this.ngxSpinnerService.show();
        } else {
          this.ngxSpinnerService.hide();
        }
      });
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
