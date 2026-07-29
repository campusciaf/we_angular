import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoAccionComponent } from './campo-accion.component';

describe('CampoAccionComponent', () => {
  let component: CampoAccionComponent;
  let fixture: ComponentFixture<CampoAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoAccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
