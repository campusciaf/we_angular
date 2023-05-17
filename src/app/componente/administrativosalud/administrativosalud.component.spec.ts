import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativosaludComponent } from './administrativosalud.component';

describe('AdministrativosaludComponent', () => {
  let component: AdministrativosaludComponent;
  let fixture: ComponentFixture<AdministrativosaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativosaludComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativosaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
