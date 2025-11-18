import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyeccionSocialComponent } from './proyeccion-social.component';

describe('ProyeccionSocialComponent', () => {
  let component: ProyeccionSocialComponent;
  let fixture: ComponentFixture<ProyeccionSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyeccionSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyeccionSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
