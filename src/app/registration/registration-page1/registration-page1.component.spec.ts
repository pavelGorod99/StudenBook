import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPage1Component } from './registration-page1.component';

describe('RegistrationPage1Component', () => {
  let component: RegistrationPage1Component;
  let fixture: ComponentFixture<RegistrationPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
