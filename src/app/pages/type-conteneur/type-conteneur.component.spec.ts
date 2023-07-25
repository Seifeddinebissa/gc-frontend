import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConteneurComponent } from './type-conteneur.component';

describe('TypeConteneurComponent', () => {
  let component: TypeConteneurComponent;
  let fixture: ComponentFixture<TypeConteneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeConteneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConteneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
