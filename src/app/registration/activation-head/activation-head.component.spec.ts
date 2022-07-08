import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationHeadComponent } from './activation-head.component';

describe('ActivationHeadComponent', () => {
  let component: ActivationHeadComponent;
  let fixture: ComponentFixture<ActivationHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
