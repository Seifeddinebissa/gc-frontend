import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteneurParcComponent } from './conteneur-parc.component';

describe('ConteneurParcComponent', () => {
  let component: ConteneurParcComponent;
  let fixture: ComponentFixture<ConteneurParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteneurParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteneurParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
