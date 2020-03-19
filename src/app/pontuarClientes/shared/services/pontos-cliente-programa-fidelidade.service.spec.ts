import { TestBed } from '@angular/core/testing';

import { PontosClienteProgramaFidelidadeService } from './pontos-cliente-programa-fidelidade.service';

describe('PontosClienteProgramaFidelidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PontosClienteProgramaFidelidadeService = TestBed.get(PontosClienteProgramaFidelidadeService);
    expect(service).toBeTruthy();
  });
});
