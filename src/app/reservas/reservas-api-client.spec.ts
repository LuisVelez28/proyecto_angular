import { TestBed } from '@angular/core/testing';

import { ReservasApiClient } from './reservas-api-client';

describe('ReservasApiClient', () => {
  let service: ReservasApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
