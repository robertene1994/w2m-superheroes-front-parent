import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

/**
 * Módulo correspondiente al diálogo de confirmación de la aplicación.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
