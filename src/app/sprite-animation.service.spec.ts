import { TestBed, inject } from '@angular/core/testing';

import { SpriteAnimationService } from './sprite-animation.service';

describe('SpriteAnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpriteAnimationService]
    });
  });

  it('should be created', inject([SpriteAnimationService], (service: SpriteAnimationService) => {
    expect(service).toBeTruthy();
  }));
});
