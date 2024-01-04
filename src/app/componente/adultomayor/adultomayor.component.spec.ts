import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultomayorComponent } from './adultomayor.component';

describe('AdultomayorComponent', () => {
  let component: AdultomayorComponent;
  let fixture: ComponentFixture<AdultomayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultomayorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdultomayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
