import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDommageComponent } from './type-dommage.component';

describe('TypeDommageComponent', () => {
  let component: TypeDommageComponent;
  let fixture: ComponentFixture<TypeDommageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDommageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDommageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
