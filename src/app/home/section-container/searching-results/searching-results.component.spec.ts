import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingResultsComponent } from './searching-results.component';

describe('SearchingResultsComponent', () => {
  let component: SearchingResultsComponent;
  let fixture: ComponentFixture<SearchingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchingResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
