import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    }
  ]
})
export class PasswordFormComponent implements ControlValueAccessor, OnInit, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(9)]]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChanged(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChanged = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * It assigns data to controls programmatically
   * @param objValue Values that will be assigned to controls
   */
  writeValue(objValue) {
    if (objValue) {
      this.Value = objValue;
    }

    console.log(objValue);
    if (objValue === null) {
      this.form.reset();
    }
  }

  get Value() {
    return this.form.value;
  }

  set Value(objValue) {
    this.form.setValue(objValue);
    this.onChanged(objValue);
    this.onTouched();
  }

  /**
   * Inbuilt function for sending validation status to parent component
   * @param _ Not sure what it is for
   */
  validate(_: FormGroup) {
    return this.form.valid ? null : { password: { valid: true } };
  }
}
