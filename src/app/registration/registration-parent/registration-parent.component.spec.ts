import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationParentComponent } from './registration-parent.component';

describe('RegistrationParentComponent', () => {
  let component: RegistrationParentComponent;
  let fixture: ComponentFixture<RegistrationParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
