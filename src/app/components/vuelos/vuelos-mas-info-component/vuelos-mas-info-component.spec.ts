import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosMasInfoComponent } from './vuelos-mas-info-component';

describe('VuelosMasInfoComponent', () => {
  let component: VuelosMasInfoComponent;
  let fixture: ComponentFixture<VuelosMasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosMasInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosMasInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
