import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpoUComponent } from './expo-u.component';

describe('ExpoUComponent', () => {
  let component: ExpoUComponent;
  let fixture: ComponentFixture<ExpoUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpoUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpoUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
