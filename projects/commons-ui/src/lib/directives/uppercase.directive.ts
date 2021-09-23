import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directiva que transforma a mayúsculas el contenido de un determinado input.
 *
 * @author Robert Ene
 */
@Directive({
  selector: '[formControlName][w2mUppercase]',
})
export class UppercaseDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement): void {
    const caretPosition = input.selectionStart;
    this.ngControl.control.setValue(input.value.toUpperCase());
    input.setSelectionRange(caretPosition, caretPosition);
  }
}
