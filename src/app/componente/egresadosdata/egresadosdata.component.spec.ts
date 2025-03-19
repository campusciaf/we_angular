import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresadosdataComponent } from './egresadosdata.component';

describe('EgresadosdataComponent', () => {
  let component: EgresadosdataComponent;
  let fixture: ComponentFixture<EgresadosdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresadosdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresadosdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
