import { TestBed, inject } from '@angular/core/testing';

import { ScormControlService } from './scorm-control.service';

describe('ScormControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScormControlService]
    });
  });

  it('should be created', inject([ScormControlService], (service: ScormControlService) => {
    expect(service).toBeTruthy();
  }));
});
