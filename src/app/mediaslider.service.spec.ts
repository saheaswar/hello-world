import { TestBed, inject } from '@angular/core/testing';

import { MediasliderService } from './mediaslider.service';

describe('MediasliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediasliderService]
    });
  });

  it('should be created', inject([MediasliderService], (service: MediasliderService) => {
    expect(service).toBeTruthy();
  }));
});
