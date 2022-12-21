import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadycrecimientoComponent } from './calidadycrecimiento.component';

describe('CalidadycrecimientoComponent', () => {
  let component: CalidadycrecimientoComponent;
  let fixture: ComponentFixture<CalidadycrecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadycrecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalidadycrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
