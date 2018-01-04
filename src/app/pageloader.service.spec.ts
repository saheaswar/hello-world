import { TestBed, inject } from '@angular/core/testing';

import { PageloaderService } from './pageloader.service';

describe('PageloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageloaderService]
    });
  });

  it('should be created', inject([PageloaderService], (service: PageloaderService) => {
    expect(service).toBeTruthy();
  }));
});
