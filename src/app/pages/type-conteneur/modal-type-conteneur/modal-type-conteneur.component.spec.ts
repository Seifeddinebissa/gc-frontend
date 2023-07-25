import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTypeConteneurComponent } from './modal-type-conteneur.component';

describe('ModalTypeConteneurComponent', () => {
  let component: ModalTypeConteneurComponent;
  let fixture: ComponentFixture<ModalTypeConteneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTypeConteneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTypeConteneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
