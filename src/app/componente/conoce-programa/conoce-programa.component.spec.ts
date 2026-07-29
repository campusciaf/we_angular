import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConoceProgramaComponent } from './conoce-programa.component';

describe('ConoceProgramaComponent', () => {
  let component: ConoceProgramaComponent;
  let fixture: ComponentFixture<ConoceProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConoceProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConoceProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
