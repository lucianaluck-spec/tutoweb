import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;

    // 1. Guarda a posição exata do cursor
    const start = input.selectionStart;
    const end = input.selectionEnd;

    // 2. Atualiza o valor para maiúsculo
    input.value = input.value.toUpperCase();

    // 3. Restaura a posição do cursor
    if (start !== null && end !== null) {
      input.setSelectionRange(start, end);
    }

    // 4. Avisa o Angular que o valor mudou
    input.dispatchEvent(new Event('input'));
  }
}