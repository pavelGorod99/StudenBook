import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPage3Component } from './registration-page3.component';

describe('RegistrationPage3Component', () => {
  let component: RegistrationPage3Component;
  let fixture: ComponentFixture<RegistrationPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
