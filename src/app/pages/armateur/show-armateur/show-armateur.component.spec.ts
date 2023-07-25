import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArmateurComponent } from './show-armateur.component';

describe('ShowArmateurComponent', () => {
  let component: ShowArmateurComponent;
  let fixture: ComponentFixture<ShowArmateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowArmateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArmateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
