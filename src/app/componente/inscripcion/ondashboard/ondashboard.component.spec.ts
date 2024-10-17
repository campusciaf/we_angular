import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndashboardComponent } from './ondashboard.component';

describe('OndashboardComponent', () => {
  let component: OndashboardComponent;
  let fixture: ComponentFixture<OndashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
