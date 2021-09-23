import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

/**
 * Servicio responsable de las operaciones relacionadas con las notificaciones
 * (mensajes) que se muestran al usuario.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private durationInSeconds: number;
  private snackBarConfig: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.durationInSeconds = 5;
    this.snackBarConfig = {
      duration: this.durationInSeconds * 1000,
      verticalPosition: <MatSnackBarVerticalPosition>'top',
      horizontalPosition: <MatSnackBarHorizontalPosition>'center',
    };
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', this.snackBarConfig);
  }
}
