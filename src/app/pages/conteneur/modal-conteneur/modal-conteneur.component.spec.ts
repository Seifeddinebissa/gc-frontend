import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConteneurComponent } from './modal-conteneur.component';

describe('ModalConteneurComponent', () => {
  let component: ModalConteneurComponent;
  let fixture: ComponentFixture<ModalConteneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConteneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConteneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
