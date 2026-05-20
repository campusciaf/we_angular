import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slidehome2Component } from './slidehome2.component';

describe('Slidehome2Component', () => {
  let component: Slidehome2Component;
  let fixture: ComponentFixture<Slidehome2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Slidehome2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Slidehome2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
