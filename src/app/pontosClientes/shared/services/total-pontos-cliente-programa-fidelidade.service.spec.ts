import { TestBed } from '@angular/core/testing';

import { TotalPontosClienteProgramaFidelidadeService } from './total-pontos-cliente-programa-fidelidade.service';

describe('TotalPontosClienteProgramaFidelidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalPontosClienteProgramaFidelidadeService = TestBed.get(TotalPontosClienteProgramaFidelidadeService);
    expect(service).toBeTruthy();
  });
});
