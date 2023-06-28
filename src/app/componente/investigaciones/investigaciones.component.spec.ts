import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionesComponent } from './investigaciones.component';

describe('InvestigacionesComponent', () => {
  let component: InvestigacionesComponent;
  let fixture: ComponentFixture<InvestigacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestigacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
