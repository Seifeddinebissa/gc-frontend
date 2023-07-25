import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParcComponent } from './modal-parc.component';

describe('ModalParcComponent', () => {
  let component: ModalParcComponent;
  let fixture: ComponentFixture<ModalParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

