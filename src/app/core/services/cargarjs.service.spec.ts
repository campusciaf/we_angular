import { TestBed } from '@angular/core/testing';

import { CargarjsService } from './cargarjs.service';

describe('CargarjsService', () => {
  let service: CargarjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
