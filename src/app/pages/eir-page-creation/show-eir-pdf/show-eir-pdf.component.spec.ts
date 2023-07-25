import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEirPdfComponent } from './show-eir-pdf.component';

describe('ShowEirPdfComponent', () => {
  let component: ShowEirPdfComponent;
  let fixture: ComponentFixture<ShowEirPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEirPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEirPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
