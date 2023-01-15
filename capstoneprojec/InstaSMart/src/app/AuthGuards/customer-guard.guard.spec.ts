import { TestBed } from '@angular/core/testing';

import { CustomerGuardGuard } from './customer-guard.guard';

describe('CustomerGuardGuard', () => {
  let guard: CustomerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
