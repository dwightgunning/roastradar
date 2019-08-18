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
    const testPosition = {
          coords: {
            latitude: 30.2696384,
            longitude: -97.74947,
            accuracy: 10000,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0
          },
          timestamp: (new Date()).valueOf()
        };
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

  it('should emit null when location unsuccessfully retrieved', (onExpectationsMet) => {
    const getCurrentPositionSpy = spyOn(navigator.geolocation, 'getCurrentPosition');
    getCurrentPositionSpy.and.callFake(
      (success, error) => error({code: 1, message: 'Error', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3})
    );
    const service: GeolocationService = TestBed.get(GeolocationService);
    service.getCurrentPosition().subscribe(
      (position: Position) => {
        expect(position).toEqual(null);
        expect(getCurrentPositionSpy).toHaveBeenCalledTimes(1);
        onExpectationsMet();
      },
      () => {}
    );
  });

  it('should emit null when geolocation disabled', (onExpectationsMet) => {
    const getCurrentPositionSpy = spyOn(navigator.geolocation, 'getCurrentPosition');
    const service: GeolocationService = TestBed.get(GeolocationService);
    service.geolocationEnabled = false;

    service.getCurrentPosition().subscribe(
      (position: Position) => {
        expect(position).toEqual(null);
        expect(getCurrentPositionSpy).toHaveBeenCalledTimes(0);
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
