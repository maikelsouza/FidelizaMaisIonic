import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PontosClientePontuarComponent } from './pontos-cliente-pontuar.component';



describe('PontosClientePontuarComponent', () => {
  let component: PontosClientePontuarComponent;
  let fixture: ComponentFixture<PontosClientePontuarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontosClientePontuarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontosClientePontuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
