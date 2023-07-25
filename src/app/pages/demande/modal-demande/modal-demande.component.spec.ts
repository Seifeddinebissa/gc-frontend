import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDemandeComponent } from './modal-demande.component';

describe('ModalDemandeComponent', () => {
  let component: ModalDemandeComponent;
  let fixture: ComponentFixture<ModalDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
