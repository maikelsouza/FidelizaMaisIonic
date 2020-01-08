import { TestBed } from '@angular/core/testing';

import { CartaoFidelidadeService } from './cartao-fidelidade.service';

describe('CartaoFidelidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartaoFidelidadeService = TestBed.get(CartaoFidelidadeService);
    expect(service).toBeTruthy();
  });
});
