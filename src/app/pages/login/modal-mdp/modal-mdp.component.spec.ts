import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMDPComponent } from './modal-mdp.component';

describe('ModalMDPComponent', () => {
  let component: ModalMDPComponent;
  let fixture: ComponentFixture<ModalMDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMDPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
