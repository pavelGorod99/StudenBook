import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationParentComponent } from '../registration-parent/registration-parent.component';
import { RegistrationHeadComponent } from '../registration-head/registration-head.component';
import { RegistrationPage1Component } from '../registration-page1/registration-page1.component';
import { RegistrationPage2Component } from '../registration-page2/registration-page2.component';
import { RegistrationPage3Component } from '../registration-page3/registration-page3.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    RegistrationHeadComponent,
    RegistrationParentComponent,
    RegistrationPage1Component,
    RegistrationPage2Component,
    RegistrationPage3Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    RouterModule.forChild([{path: '', component: RegistrationParentComponent}])
  ]
})
export class RegistrationModule { }
