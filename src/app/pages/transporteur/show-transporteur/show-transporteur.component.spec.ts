import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransporteurComponent } from './show-transporteur.component';

describe('ShowTransporteurComponent', () => {
  let component: ShowTransporteurComponent;
  let fixture: ComponentFixture<ShowTransporteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTransporteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
