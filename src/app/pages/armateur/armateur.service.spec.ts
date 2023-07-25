import { TestBed } from '@angular/core/testing';

import { ArmateurService } from './armateur.service';

describe('ArmateurService', () => {
  let service: ArmateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
