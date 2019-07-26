import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  errorMsg = '';
  userModel = new User('', '', null, '', '', false);

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.enrollmentService.getEnroll().subscribe(data => {
      console.log(data);
      this.userModel = data;
    });
  }

  validateTopic(selectedTopic: string) {
    if (selectedTopic === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit(userForm) {
    console.log(userForm);
    this.submitted = true;
    console.log(this.userModel);
    this.enrollmentService.enroll(this.userModel).subscribe(
      data => console.log('Success!', data),
      error => {
        console.log('Error!', error);
        this.errorMsg = error;
      }
    );
  }
}
