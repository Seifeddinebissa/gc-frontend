import { TestBed } from '@angular/core/testing';

import { TypeDommageService } from './type-dommage.service';

describe('TypeDommageService', () => {
  let service: TypeDommageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDommageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
