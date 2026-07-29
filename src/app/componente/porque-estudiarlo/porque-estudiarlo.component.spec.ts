import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PorqueEstudiarloComponent } from './porque-estudiarlo.component';
import { DestacarTextoPipe } from '@/app/core/pipes/destacar-texto.pipe';

describe('PorqueEstudiarloComponent', () => {
  let component: PorqueEstudiarloComponent;
  let fixture: ComponentFixture<PorqueEstudiarloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ PorqueEstudiarloComponent, DestacarTextoPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorqueEstudiarloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
