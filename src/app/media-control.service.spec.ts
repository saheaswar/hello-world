import { TestBed, inject } from '@angular/core/testing';

import { MediaControlService } from './media-control.service';

describe('AudioControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaControlService]
    });
  });

  it('should be created', inject([MediaControlService], (service: MediaControlService) => {
    expect(service).toBeTruthy();
  }));
});
