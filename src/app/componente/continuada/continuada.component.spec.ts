import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuadaComponent } from './continuada.component';

describe('ContinuadaComponent', () => {
  let component: ContinuadaComponent;
  let fixture: ComponentFixture<ContinuadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
