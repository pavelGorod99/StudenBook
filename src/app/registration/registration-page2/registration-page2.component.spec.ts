import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPage2Component } from './registration-page2.component';

describe('RegistrationPage2Component', () => {
  let component: RegistrationPage2Component;
  let fixture: ComponentFixture<RegistrationPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
