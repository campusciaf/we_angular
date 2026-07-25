import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescubrecaminoComponent } from './descubrecamino.component';

describe('DescubrecaminoComponent', () => {
  let component: DescubrecaminoComponent;
  let fixture: ComponentFixture<DescubrecaminoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescubrecaminoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescubrecaminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
