import { TestBed, inject } from '@angular/core/testing';

import { MenuControlService } from './menu-control.service';

describe('MenuControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuControlService]
    });
  });

  it('should be created', inject([MenuControlService], (service: MenuControlService) => {
    expect(service).toBeTruthy();
  }));
});
