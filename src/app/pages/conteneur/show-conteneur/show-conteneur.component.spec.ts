import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConteneurComponent } from './show-conteneur.component';

describe('ShowConteneurComponent', () => {
  let component: ShowConteneurComponent;
  let fixture: ComponentFixture<ShowConteneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowConteneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConteneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
