import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandeComponent } from './show-demande.component';

describe('ShowDemandeComponent', () => {
  let component: ShowDemandeComponent;
  let fixture: ComponentFixture<ShowDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
