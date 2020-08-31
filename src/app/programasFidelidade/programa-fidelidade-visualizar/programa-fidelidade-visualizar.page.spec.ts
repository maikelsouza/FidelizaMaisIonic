import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaFidelidadeVisualizarPage } from './programa-fidelidade-visualizar.page';

describe('ProgramaFidelidadeVisualizarPage', () => {
  let component: ProgramaFidelidadeVisualizarPage;
  let fixture: ComponentFixture<ProgramaFidelidadeVisualizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaFidelidadeVisualizarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaFidelidadeVisualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
