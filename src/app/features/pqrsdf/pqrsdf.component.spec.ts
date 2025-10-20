import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsdfComponent } from './pqrsdf.component';

describe('PqrsdfComponent', () => {
  let component: PqrsdfComponent;
  let fixture: ComponentFixture<PqrsdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
