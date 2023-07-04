import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasCiafComponent } from './noticias-ciaf.component';

describe('NoticiasCiafComponent', () => {
  let component: NoticiasCiafComponent;
  let fixture: ComponentFixture<NoticiasCiafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasCiafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasCiafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
