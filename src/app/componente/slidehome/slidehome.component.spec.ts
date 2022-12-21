import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidehomeComponent } from './slidehome.component';

describe('SlidehomeComponent', () => {
  let component: SlidehomeComponent;
  let fixture: ComponentFixture<SlidehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidehomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
