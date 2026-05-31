import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorqueciafComponent } from './porqueciaf.component';

describe('PorqueciafComponent', () => {
  let component: PorqueciafComponent;
  let fixture: ComponentFixture<PorqueciafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorqueciafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorqueciafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
