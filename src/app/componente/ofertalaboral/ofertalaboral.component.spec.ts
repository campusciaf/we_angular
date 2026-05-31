import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertalaboralComponent } from './ofertalaboral.component';

describe('OfertalaboralComponent', () => {
  let component: OfertalaboralComponent;
  let fixture: ComponentFixture<OfertalaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertalaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertalaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
