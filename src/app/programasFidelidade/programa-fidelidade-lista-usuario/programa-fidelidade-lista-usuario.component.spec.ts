import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaFidelidadeListaUsuarioComponent } from './programa-fidelidade-lista-usuario.component';

describe('ProgramaFidelidadeListaUsuarioComponent', () => {
  let component: ProgramaFidelidadeListaUsuarioComponent;
  let fixture: ComponentFixture<ProgramaFidelidadeListaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaFidelidadeListaUsuarioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaFidelidadeListaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
