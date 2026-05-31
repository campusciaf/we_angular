import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnciafComponent } from './adnciaf.component';

describe('AdnciafComponent', () => {
  let component: AdnciafComponent;
  let fixture: ComponentFixture<AdnciafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnciafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdnciafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
