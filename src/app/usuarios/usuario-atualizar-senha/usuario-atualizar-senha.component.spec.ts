import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAtualizarSenhaComponent } from './usuario-atualizar-senha.component';

describe('UsuarioAtualizarSenhaComponent', () => {
  let component: UsuarioAtualizarSenhaComponent;
  let fixture: ComponentFixture<UsuarioAtualizarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAtualizarSenhaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAtualizarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
