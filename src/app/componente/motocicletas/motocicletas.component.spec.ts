import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotocicletasComponent } from './motocicletas.component';

describe('MotocicletasComponent', () => {
  let component: MotocicletasComponent;
  let fixture: ComponentFixture<MotocicletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotocicletasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotocicletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
