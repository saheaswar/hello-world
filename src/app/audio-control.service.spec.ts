import { TestBed, inject } from '@angular/core/testing';

import { AudioControlService } from './audio-control.service';

describe('AudioControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioControlService]
    });
  });

  it('should be created', inject([AudioControlService], (service: AudioControlService) => {
    expect(service).toBeTruthy();
  }));
});
