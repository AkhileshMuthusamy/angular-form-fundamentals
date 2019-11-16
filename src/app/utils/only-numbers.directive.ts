import { Directive, HostListener, ElementRef } from '@angular/core';
/**
 * Use this directive only on input element
 */
@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  private regExonlyNumbers: RegExp = new RegExp('^[0-9]*$');
  private specialKeys: Array<string> = ['Backspace', 'ArrowLeft', 'ArrowRight'];
  constructor(private elementRef: ElementRef) {}
  /**
   * Listen to keydown event
   * @param event used to retrieve input data from element
   */
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    /** value.concat is used to merge current key value with previous input value */
    console.log('Input Value ' + (this.elementRef.nativeElement as HTMLInputElement).value.concat(event.key));
    console.log('Key Input ' + event.key);

    const inputValue: string = (this.elementRef.nativeElement as HTMLInputElement).value.concat(event.key);
    if (inputValue && !String(inputValue).match(this.regExonlyNumbers)) {
      event.preventDefault();
    }
  }

  /**
   * Listen to Paste event
   * @param event Captures data on Paste event
   */
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // const clipboardData = (event || event.originalEvent).clipboardData.getData('text/plain');
    const clipboardData = event.clipboardData.getData('text/plain');
    if (clipboardData && !this.regExonlyNumbers.test(clipboardData)) {
      event.preventDefault();
    }
  }
}
