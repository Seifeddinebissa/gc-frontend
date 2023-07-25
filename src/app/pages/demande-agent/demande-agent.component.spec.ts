import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAgentComponent } from './demande-agent.component';

describe('DemandeAgentComponent', () => {
  let component: DemandeAgentComponent;
  let fixture: ComponentFixture<DemandeAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
