import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngSoftwareComponent } from './ing-software.component';

describe('IngSoftwareComponent', () => {
  let component: IngSoftwareComponent;
  let fixture: ComponentFixture<IngSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngSoftwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
