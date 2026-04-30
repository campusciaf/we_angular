import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraiaWidgetComponent } from './craia-widget.component';

describe('CraiaWidgetComponent', () => {
  let component: CraiaWidgetComponent;
  let fixture: ComponentFixture<CraiaWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraiaWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraiaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
