import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuadaDetalleComponent } from './continuada-detalle.component';

describe('ContinuadaDetalleComponent', () => {
  let component: ContinuadaDetalleComponent;
  let fixture: ComponentFixture<ContinuadaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuadaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
