import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmateurComponent } from './armateur.component';

describe('ArmateurComponent', () => {
  let component: ArmateurComponent;
  let fixture: ComponentFixture<ArmateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
