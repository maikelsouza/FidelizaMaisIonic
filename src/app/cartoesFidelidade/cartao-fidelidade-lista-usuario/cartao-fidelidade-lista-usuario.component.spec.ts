import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoFidelidadeListaUsuarioComponent } from './cartao-fidelidade-lista-usuario.component';

describe('CartaoFidelidadeListaComponent', () => {
  let component: CartaoFidelidadeListaUsuarioComponent;
  let fixture: ComponentFixture<CartaoFidelidadeListaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoFidelidadeListaUsuarioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoFidelidadeListaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
