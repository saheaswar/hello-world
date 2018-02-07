import { TestBed, inject } from '@angular/core/testing';

import { BrowserDetectService } from './browser-detect.service';

describe('BrowserDetectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserDetectService]
    });
  });

  it('should be created', inject([BrowserDetectService], (service: BrowserDetectService) => {
    expect(service).toBeTruthy();
  }));
});
