import { TestBed, inject } from '@angular/core/testing';

import { DeviceDetectService } from './device-detect.service';

describe('DeviceDetectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectService]
    });
  });

  it('should be created', inject([DeviceDetectService], (service: DeviceDetectService) => {
    expect(service).toBeTruthy();
  }));
});
