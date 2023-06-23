import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprendimientodetalleComponent } from './emprendimientodetalle.component';

describe('EmprendimientodetalleComponent', () => {
  let component: EmprendimientodetalleComponent;
  let fixture: ComponentFixture<EmprendimientodetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmprendimientodetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprendimientodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
