import { TestBed, inject } from '@angular/core/testing';

import { GlossaryControlService } from './glossary-control.service';

describe('GlossaryControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlossaryControlService]
    });
  });

  it('should be created', inject([GlossaryControlService], (service: GlossaryControlService) => {
    expect(service).toBeTruthy();
  }));
});
