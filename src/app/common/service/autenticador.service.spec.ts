import { TestBed } from '@angular/core/testing';

import { AutenticadorService } from './autenticador.service';

describe('AutenticadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticadorService = TestBed.get(AutenticadorService);
    expect(service).toBeTruthy();
  });
});
