import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturoComponent } from './futuro.component';

describe('FuturoComponent', () => {
  let component: FuturoComponent;
  let fixture: ComponentFixture<FuturoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuturoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuturoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
