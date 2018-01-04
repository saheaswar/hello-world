import { TestBed, inject } from '@angular/core/testing';

import { PagedetailService } from './pagedetail.service';

describe('PagedetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagedetailService]
    });
  });

  it('should be created', inject([PagedetailService], (service: PagedetailService) => {
    expect(service).toBeTruthy();
  }));
});
