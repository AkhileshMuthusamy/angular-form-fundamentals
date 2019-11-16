import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reuableforms',
  templateUrl: './reuableforms.component.html',
  styleUrls: ['./reuableforms.component.css']
})
export class ReuableformsComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      password: [{ password: '123', confirmPassword: '1234' }],
      profile: []
    });
  }

  ngOnInit() {}

  submit() {
    console.log(this.signupForm.value);
  }
}
