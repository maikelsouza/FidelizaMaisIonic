import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgatarPontosClienteResgateComponent } from './resgatar-pontos-cliente-resgate.component';

describe('ResgatarPontosClienteResgateComponent', () => {
  let component: ResgatarPontosClienteResgateComponent;
  let fixture: ComponentFixture<ResgatarPontosClienteResgateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgatarPontosClienteResgateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgatarPontosClienteResgateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
