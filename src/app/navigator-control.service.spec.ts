import { TestBed, inject } from '@angular/core/testing';

import { NavigatorControlService } from './navigator-control.service';

describe('NavigatorControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigatorControlService]
    });
  });

  it('should be created', inject([NavigatorControlService], (service: NavigatorControlService) => {
    expect(service).toBeTruthy();
  }));
});
