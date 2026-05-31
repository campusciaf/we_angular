import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesosrapidosComponent } from './accesosrapidos.component';

describe('AccesosrapidosComponent', () => {
  let component: AccesosrapidosComponent;
  let fixture: ComponentFixture<AccesosrapidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesosrapidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesosrapidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
