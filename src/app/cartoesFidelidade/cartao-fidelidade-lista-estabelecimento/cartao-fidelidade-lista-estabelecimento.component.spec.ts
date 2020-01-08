import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartao-fidelidade-lista-estabelecimento.component';

describe('CartaoFidelidadeListaEstabelecimentoComponent', () => {
  let component: CartaoFidelidadeListaEstabelecimentoComponent;
  let fixture: ComponentFixture<CartaoFidelidadeListaEstabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoFidelidadeListaEstabelecimentoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoFidelidadeListaEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
