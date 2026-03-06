import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosMainComponent } from './vuelos-main-component';

describe('VuelosMainComponent', () => {
  let component: VuelosMainComponent;
  let fixture: ComponentFixture<VuelosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosMainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
