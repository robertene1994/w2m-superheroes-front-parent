import { NgModule } from '@angular/core';

import { UppercaseDirective } from './uppercase.directive';

/**
 * Módulo correspondiente a las directivas de la aplicación.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [UppercaseDirective],
  imports: [],
  exports: [UppercaseDirective],
})
export class DirectivesModule {}
