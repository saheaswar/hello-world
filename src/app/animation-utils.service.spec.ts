import { TestBed, inject } from '@angular/core/testing';

import { AnimationUtilsService } from './animation-utils.service';

describe('AnimationUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationUtilsService]
    });
  });

  it('should be created', inject([AnimationUtilsService], (service: AnimationUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
