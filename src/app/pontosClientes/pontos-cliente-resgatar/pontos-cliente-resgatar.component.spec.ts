import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontosClienteResgatarComponent } from './pontos-cliente-resgatar.component';

describe('PontosClienteResgatarComponent', () => {
  let component: PontosClienteResgatarComponent;
  let fixture: ComponentFixture<PontosClienteResgatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontosClienteResgatarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontosClienteResgatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
