import { NgModule } from '@angular/core';

import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SnackBarService } from './services/snack-bar.service';

import { SpinnerModule } from './components/spinner/spinner.module';
import { DirectivesModule } from './directives/directives.module';

/**
 * Módulo correspondiente a la librería `commons-ui`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [],
  imports: [SpinnerModule, DirectivesModule],
  exports: [SpinnerModule, DirectivesModule],
  providers: [SnackBarService, AuthInterceptor, HttpErrorInterceptor],
})
export class CommonsUiModule {}
