import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvadministrativoComponent } from './cvadministrativo.component';

describe('CvadministrativoComponent', () => {
  let component: CvadministrativoComponent;
  let fixture: ComponentFixture<CvadministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvadministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvadministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
