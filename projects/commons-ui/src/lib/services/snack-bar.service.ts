import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  public showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', this.snackBarConfig);
  }
}
