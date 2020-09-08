import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCadastroEstabelecimentoPage } from './usuario-cadastro-estabelecimento.page';

describe('UsuarioCadastroEstabelecimentoPage', () => {
  let component: UsuarioCadastroEstabelecimentoPage;
  let fixture: ComponentFixture<UsuarioCadastroEstabelecimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCadastroEstabelecimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCadastroEstabelecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
