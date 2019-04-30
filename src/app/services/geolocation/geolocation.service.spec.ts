import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationService = TestBed.get(GeolocationService);
    expect(service).toBeTruthy();
  });

  it('detects browser geolocation available', () => {
    const service: GeolocationService = TestBed.get(GeolocationService);
    expect(service.geolocationEnabled).toBeTruthy();
  });

  it('should emit position when successfully retrieved', (onExpectationsMet) => {
    const testPosition = {lat: 0, lng: 0};
    const getCurrentPositionSpy = spyOn(navigator.geolocation, 'getCurrentPosition');
    getCurrentPositionSpy.and.callFake(
      (success) => success(testPosition)
    );
    const service: GeolocationService = TestBed.get(GeolocationService);
    service.getCurrentPosition().subscribe(
      (position: any) => {
        expect(getCurrentPositionSpy).toHaveBeenCalledTimes(1);
        onExpectationsMet();
      },
      (error: any) => {},
      () => {}
    );
  });

  // TODO
  it('should emit error when unsuccessfully retrieved', (onExpectationsMet) => {
    const getCurrentPositionSpy = spyOn(navigator.geolocation, 'getCurrentPosition');
    getCurrentPositionSpy.and.callFake(
      (success, error) => error('Error')
    );
    const service: GeolocationService = TestBed.get(GeolocationService);
    service.getCurrentPosition().subscribe(
      (position: any) => {},
      (error: any) => {
        expect(error).toEqual('Error');
        expect(getCurrentPositionSpy).toHaveBeenCalledTimes(1);
        onExpectationsMet();
      },
      () => {}
    );
  });

  it('should complete immediately when geolocation unavailable', (onExpectationsMet) => {
    const service: GeolocationService = TestBed.get(GeolocationService);
    service.geolocationEnabled = false;
    service.getCurrentPosition().subscribe(
      (position: any) => {
        expect(position).toBeNull();
        onExpectationsMet();
      },
      (error: any) => {},
      () => {}
    );
  });

});
