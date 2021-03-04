import { TestBed } from '@angular/core/testing';

import { DetallesGuard } from './detalles.guard';

describe('DetallesGuard', () => {
  let guard: DetallesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetallesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
