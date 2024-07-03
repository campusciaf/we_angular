import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenciaComponent } from './permanencia.component';

describe('PermanenciaComponent', () => {
  let component: PermanenciaComponent;
  let fixture: ComponentFixture<PermanenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermanenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermanenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
