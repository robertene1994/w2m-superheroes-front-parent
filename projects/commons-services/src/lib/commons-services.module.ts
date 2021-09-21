import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { LocalStorageService } from './session/local-storage.service';
import { SessionService } from './session/session.service';
import { SpinnerService } from './services/spinner.service';
import { SuperheroService } from './services/superhero.service';

/**
 * Módulo correspondiente a la librería `commons-services`.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AuthGuard,
    LocalStorageService,
    SessionService,
    SpinnerService,
    SuperheroService,
  ],
})
export class CommonsServicesModule {}
