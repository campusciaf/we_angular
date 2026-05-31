import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaprofesionalComponent } from './ofertaprofesional.component';

describe('OfertaprofesionalComponent', () => {
  let component: OfertaprofesionalComponent;
  let fixture: ComponentFixture<OfertaprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaprofesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
