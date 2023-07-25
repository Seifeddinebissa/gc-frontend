import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDemandesComponent } from './my-demandes.component';

describe('MyDemandesComponent', () => {
  let component: MyDemandesComponent;
  let fixture: ComponentFixture<MyDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDemandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
