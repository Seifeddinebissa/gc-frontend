import { TestBed } from '@angular/core/testing';

import { TypeConteneurService } from './type-conteneur.service';

describe('TypeConteneurService', () => {
  let service: TypeConteneurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeConteneurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
