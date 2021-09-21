import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SpinnerComponent } from './spinner.component';

/**
 * Módulo correspondiente al spinner de la aplicación.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
