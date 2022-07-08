import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapeContainerComponent } from './tape-container.component';

describe('TapeContainerComponent', () => {
  let component: TapeContainerComponent;
  let fixture: ComponentFixture<TapeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
