import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasListado } from './reservas-listado';

describe('ReservasListado', () => {
  let component: ReservasListado;
  let fixture: ComponentFixture<ReservasListado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasListado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasListado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
