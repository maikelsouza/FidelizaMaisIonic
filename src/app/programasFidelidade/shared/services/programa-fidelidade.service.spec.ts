import { TestBed } from '@angular/core/testing';

import { ProgramaFidelidadeService } from './programa-fidelidade.service';

describe('ProgramaFidelidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramaFidelidadeService = TestBed.get(ProgramaFidelidadeService);
    expect(service).toBeTruthy();
  });
});
