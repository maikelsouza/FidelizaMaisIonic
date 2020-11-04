import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusClientesListaPage } from './meus-clientes-lista.page';

describe('MeusClientesListaPage', () => {
  let component: MeusClientesListaPage;
  let fixture: ComponentFixture<MeusClientesListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusClientesListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusClientesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
