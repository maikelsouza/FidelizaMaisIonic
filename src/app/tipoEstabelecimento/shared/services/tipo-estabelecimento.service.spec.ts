import { TestBed } from '@angular/core/testing';

import { TipoEstabelecimentoService } from './tipo-estabelecimento.service';

describe('TipoEstabelecimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoEstabelecimentoService = TestBed.get(TipoEstabelecimentoService);
    expect(service).toBeTruthy();
  });
});
