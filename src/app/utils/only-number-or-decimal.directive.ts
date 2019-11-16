import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumberOrDecimal]'
})
export class OnlyNumberOrDecimalDirective {
  private regExonlyDecimal: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    /** value.concat is used to merge current key value with previous input value */
    console.log('Input Value ' + (this.elementRef.nativeElement as HTMLInputElement).value.concat(event.key));
    console.log('Key Input ' + event.key);

    const inputValue: string = (this.elementRef.nativeElement as HTMLInputElement).value.concat(event.key);
    if (inputValue && !String(inputValue).match(this.regExonlyDecimal)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // const clipboardData = (event || event.originalEvent).clipboardData.getData('text/plain');
    const clipboardData = event.clipboardData.getData('text/plain');
    if (clipboardData && !this.regExonlyDecimal.test(clipboardData)) {
      event.preventDefault();
    }
  }
}
