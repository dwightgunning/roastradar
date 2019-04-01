import { TestBed } from '@angular/core/testing';

import { RoastersService } from './roasters.service';

describe('RoastersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoastersService = TestBed.get(RoastersService);
    expect(service).toBeTruthy();
  });
});
