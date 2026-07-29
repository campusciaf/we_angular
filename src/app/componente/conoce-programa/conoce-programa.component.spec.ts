import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConoceProgramaComponent } from './conoce-programa.component';
import { DestacarTextoPipe } from '@/app/core/pipes/destacar-texto.pipe';

describe('ConoceProgramaComponent', () => {
  let component: ConoceProgramaComponent;
  let fixture: ComponentFixture<ConoceProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ConoceProgramaComponent, DestacarTextoPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConoceProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
