import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(regxPattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = regxPattern.test(control.value);
    const data = forbidden ? { forbiddenName: { value: control.value } } : null;
    console.log(forbidden);
    console.log(data);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
