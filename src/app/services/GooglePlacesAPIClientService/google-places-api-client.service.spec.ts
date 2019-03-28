import { TestBed } from '@angular/core/testing';

import { MapsAPILoader } from '@agm/core';

import { GooglePlacesAPIClientService } from './google-places-api-client.service';

describe('GooglePlacesAPIClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MapsAPILoader],
  }));

  it('should be created', () => {
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);
    expect(service).toBeTruthy();
  });
});
