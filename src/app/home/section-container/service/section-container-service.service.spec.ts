import { TestBed } from '@angular/core/testing';

import { SectionContainerServiceService } from './section-container-service.service';

describe('SectionContainerServiceService', () => {
  let service: SectionContainerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionContainerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
