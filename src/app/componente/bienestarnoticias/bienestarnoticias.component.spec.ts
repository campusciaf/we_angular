import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarnoticiasComponent } from './bienestarnoticias.component';

describe('BienestarnoticiasComponent', () => {
  let component: BienestarnoticiasComponent;
  let fixture: ComponentFixture<BienestarnoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienestarnoticiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienestarnoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
