import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationHeadComponent } from './registration-head.component';

describe('RegistrationHeadComponent', () => {
  let component: RegistrationHeadComponent;
  let fixture: ComponentFixture<RegistrationHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
