import { NgModule } from '@angular/core';

import { ConfirmationDialogModule } from './components/dialog/confirmation-dialog.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { DirectivesModule } from './directives/directives.module';

import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SnackBarService } from './services/snack-bar.service';

/**
 * Módulo correspondiente a la librería `commons-ui`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [],
  imports: [ConfirmationDialogModule, SpinnerModule, DirectivesModule],
  exports: [ConfirmationDialogModule, SpinnerModule, DirectivesModule],
  providers: [SnackBarService, AuthInterceptor, HttpErrorInterceptor],
})
export class CommonsUiModule {}
