import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReuableformsComponent } from './reuableforms/reuableforms.component';
import { ProfileFormComponent } from './reuableforms/profile-form/profile-form.component';
import { PasswordFormComponent } from './reuableforms/password-form/password-form.component';
import { OnlyNumbersDirective } from './utils/only-numbers.directive';
import { OnlyNumberOrDecimalDirective } from './utils/only-number-or-decimal.directive';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    ReuableformsComponent,
    ProfileFormComponent,
    PasswordFormComponent,
    OnlyNumbersDirective,
    OnlyNumberOrDecimalDirective
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, TextMaskModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
