import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentParcComponent } from './agent-parc.component';

describe('AgentParcComponent', () => {
  let component: AgentParcComponent;
  let fixture: ComponentFixture<AgentParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
