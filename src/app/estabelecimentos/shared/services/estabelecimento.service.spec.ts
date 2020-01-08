import { TestBed } from '@angular/core/testing';

import { EstabelecimentoService } from './estabelecimento.service';

describe('EstabelecimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstabelecimentoService = TestBed.get(EstabelecimentoService);
    expect(service).toBeTruthy();
  });
});
