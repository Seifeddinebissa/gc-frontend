import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArmateurComponent } from './modal-armateur.component';

describe('ModalArmateurComponent', () => {
  let component: ModalArmateurComponent;
  let fixture: ComponentFixture<ModalArmateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalArmateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArmateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
