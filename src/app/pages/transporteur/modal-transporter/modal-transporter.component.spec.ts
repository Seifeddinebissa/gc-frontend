import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransporterComponent } from './modal-transporter.component';

describe('ModalTransporterComponent', () => {
  let component: ModalTransporterComponent;
  let fixture: ComponentFixture<ModalTransporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTransporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
