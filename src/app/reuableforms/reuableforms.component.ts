import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reuableforms',
  templateUrl: './reuableforms.component.html',
  styleUrls: ['./reuableforms.component.css']
})
export class ReuableformsComponent implements OnInit {
  signupForm: FormGroup;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      password: [{ password: '123', confirmPassword: '1234' }],
      profile: [],
      zipcode: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  submit() {
    console.log('Masked: ', this.signupForm.value);
    // Unmasking zip code if necessary
    this.signupForm.patchValue({
      zipcode: this.signupForm.controls.zipcode.value.replace(/\D+/g, '')
    });
    console.log('UnMasked: ', this.signupForm.value);
  }
}
