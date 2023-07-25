import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EirPageCreationComponent } from './eir-page-creation.component';

describe('EirPageCreationComponent', () => {
  let component: EirPageCreationComponent;
  let fixture: ComponentFixture<EirPageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EirPageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EirPageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
