import { TestBed, inject } from '@angular/core/testing';

import { ResourceControlService } from './resource-control.service';

describe('ResourceControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceControlService]
    });
  });

  it('should be created', inject([ResourceControlService], (service: ResourceControlService) => {
    expect(service).toBeTruthy();
  }));
});
