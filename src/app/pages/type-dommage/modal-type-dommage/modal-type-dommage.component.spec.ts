import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTypeDommageComponent } from './modal-type-dommage.component';

describe('ModalTypeDommageComponent', () => {
  let component: ModalTypeDommageComponent;
  let fixture: ComponentFixture<ModalTypeDommageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTypeDommageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTypeDommageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
