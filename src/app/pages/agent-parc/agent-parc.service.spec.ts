import { TestBed } from '@angular/core/testing';

import { AgentParcService } from './agent-parc.service';

describe('AgentParcService', () => {
  let service: AgentParcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentParcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
