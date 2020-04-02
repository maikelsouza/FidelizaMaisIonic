import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciMinhaSenhaCadastroComponent } from './esqueci-minha-senha-cadastro.component';

describe('EsqueciMinhaSenhaCadastroComponent', () => {
  let component: EsqueciMinhaSenhaCadastroComponent;
  let fixture: ComponentFixture<EsqueciMinhaSenhaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueciMinhaSenhaCadastroComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueciMinhaSenhaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
