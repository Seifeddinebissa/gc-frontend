import { TestBed } from '@angular/core/testing';

import { EirService } from './eir.service';

describe('EirService', () => {
  let service: EirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
