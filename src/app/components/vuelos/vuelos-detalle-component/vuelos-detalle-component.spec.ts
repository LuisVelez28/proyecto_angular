import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetalleComponent } from './vuelos-detalle-component';

describe('VuelosDetalleComponent', () => {
  let component: VuelosDetalleComponent;
  let fixture: ComponentFixture<VuelosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosDetalleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
