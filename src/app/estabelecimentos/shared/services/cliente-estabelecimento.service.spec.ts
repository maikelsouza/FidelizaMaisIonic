import { TestBed } from '@angular/core/testing';

import { ClienteEstabelecimentoService } from './cliente-estabelecimento.service';

describe('ClienteEstabelecimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteEstabelecimentoService = TestBed.get(ClienteEstabelecimentoService);
    expect(service).toBeTruthy();
  });
});
