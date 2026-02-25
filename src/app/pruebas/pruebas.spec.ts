import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pruebas } from './pruebas';

describe('Pruebas', () => {
  let component: Pruebas;
  let fixture: ComponentFixture<Pruebas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pruebas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pruebas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
