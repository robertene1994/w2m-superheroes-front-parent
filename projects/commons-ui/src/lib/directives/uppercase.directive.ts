import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Directiva que transforma a mayúsculas el contenido de un determinado input.
 *
 * @author Robert Ene
 */
@Directive({
  selector: '[uppercase]',
})
export class UppercaseDirective {
  constructor(public ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    this.ref.nativeElement.value = event.target.value.toUpperCase();
  }
}
