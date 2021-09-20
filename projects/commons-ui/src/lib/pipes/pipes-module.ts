import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize-pipe';
import { DirectHTMLDirective } from './safe-html-pipe';

@NgModule({
  declarations: [CapitalizePipe, DirectHTMLDirective],
  imports: [],
  entryComponents: [],
  exports: [CapitalizePipe, DirectHTMLDirective],
  providers: [],
})
export class CommonPipesModule {}
