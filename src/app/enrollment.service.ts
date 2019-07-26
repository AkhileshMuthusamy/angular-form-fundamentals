import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  enroll(user: User) {
    return this.http.post<any>(this.url + '/enroll', user).pipe(catchError(this.errorHandler));
    console.log(user);
  }

  getEnroll() {
    return this.http.get<any>(this.url + '/enroll');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.statusText);
  }
}
