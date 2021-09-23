import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { FilterService } from './services/filter.service';
import { LocalStorageService } from './services/local-storage.service';
import { SessionService } from './services/session.service';
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
    FilterService,
    LocalStorageService,
    SessionService,
    SpinnerService,
    SuperheroService,
  ],
})
export class CommonsServicesModule {}
