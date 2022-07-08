import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLeftSideComponent } from './menu-left-side.component';

describe('MenuLeftSideComponent', () => {
  let component: MenuLeftSideComponent;
  let fixture: ComponentFixture<MenuLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLeftSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
