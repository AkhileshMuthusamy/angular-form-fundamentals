import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { forbiddenNameValidator } from '../shared/user-name.validator';
import { passwordValidator } from '../shared/password.validator';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  registrationForm: FormGroup;

  // For understanding purpose only
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Batman'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(9), forbiddenNameValidator(/admin/)]],
        email: [''],
        subscribe: [false],
        password: ['', Validators.required],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: ['']
        }),
        alternateEmails: this.fb.array([]) /* Dynamic controls*/
      },
      { validators: passwordValidator }
    );

    // Conditional Validation
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
    // this.loadApiData();
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control('default value' + this.alternateEmails.controls.length));
  }

  removeAlternateEmail(index: number) {
    this.alternateEmails.removeAt(index);
  }

  loadApiData() {
    // setValue requires all fields
    this.registrationForm.setValue({
      userName: 'Spider Man',
      password: 'webiee',
      confirmPassword: 'webiee',
      address: {
        city: 'New York',
        state: 'New York',
        postalCode: '10004'
      }
    });

    // patchValue can be used to update specific field
    this.registrationForm.patchValue({
      userName: 'Venom',
      password: 'parsite',
      confirmPassword: 'parsite'
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value).subscribe(
      response => {
        console.log('Success!', response);
      },
      error => {
        console.error('Error!', error);
      }
    );
  }
}
