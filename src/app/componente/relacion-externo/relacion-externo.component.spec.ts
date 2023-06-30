import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionExternoComponent } from './relacion-externo.component';

describe('RelacionExternoComponent', () => {
  let component: RelacionExternoComponent;
  let fixture: ComponentFixture<RelacionExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacionExternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacionExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
