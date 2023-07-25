import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgentComponent } from './modal-agent.component';

describe('ModalAgentComponent', () => {
  let component: ModalAgentComponent;
  let fixture: ComponentFixture<ModalAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
