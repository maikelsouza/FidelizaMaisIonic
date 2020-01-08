import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaFidelidadeCadastroComponent } from './programa-fidelidade-cadastro.component';

describe('ProgramaFidelidadeCadastroComponent', () => {
  let component: ProgramaFidelidadeCadastroComponent;
  let fixture: ComponentFixture<ProgramaFidelidadeCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaFidelidadeCadastroComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaFidelidadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
