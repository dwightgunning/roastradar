import { TestBed } from '@angular/core/testing';

import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';  // TODO: needed?
import { BehaviorSubject, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GooglePlace } from '../../models/google-place';
import { GooglePlacesAPIClientService } from './google-places-api-client.service';

describe('GooglePlacesAPIClientService', () => {
  let mapLoaderSpy: jasmine.SpyObj<MapsAPILoader>;
  beforeEach(() => {
    mapLoaderSpy = jasmine.createSpyObj('MapsAPILoader', ['load']);
    mapLoaderSpy.load.and.returnValue( Promise.resolve());
    TestBed.configureTestingModule({
      providers: [
        { provide: MapsAPILoader, useValue: mapLoaderSpy }
      ]
    });
  });

  it('should be created', () => {
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);
    expect(service).toBeTruthy();
  });

  it('emits an error if AGM Map Loader fails loading the Google Maps script', (onExpectationsMet) => {
    const mapLoaderRejection = 'rejected';
    mapLoaderSpy.load.and.returnValue(Promise.reject(mapLoaderRejection));
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);
    service.getPlace('placeId').subscribe(
      (googlePlace: GooglePlace) => {},
      (err) => {
        expect(mapLoaderSpy.load).toHaveBeenCalledTimes(1);
        expect(err).toEqual(mapLoaderRejection);
        onExpectationsMet();
      }
    );
  });

  it('emits an error if AGM Map Loader throws an exception loading the Google Maps script', (onExpectationsMet) => {
    const testError = Error('test error');
    (window as any).google = {maps: {places: {
      PlacesServiceStatus: {OK: 'OK'},
      PlacesService: () => { throw testError; }
    }}};

    const mapLoaderRejection = 'rejected';
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);
    service.getPlace('placeId').subscribe(
      (googlePlace: GooglePlace) => {},
      (err) => {
        expect(mapLoaderSpy.load).toHaveBeenCalledTimes(1);
        expect(err).toEqual(testError);
        onExpectationsMet();
        delete (window as any).google;
      }
    );
  });

  it('requests Place details via GooglePlacesService', (onExpectationsMet) => {
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);

    const googlePlacesServiceSpy = jasmine.createSpyObj('PlacesService', ['getDetails']);
    const testPlaceDetails = {id: 'placeId'};
    const getDetailsSpy = googlePlacesServiceSpy.getDetails.and.callFake(
      (requestObj, callback) => callback(testPlaceDetails, google.maps.places.PlacesServiceStatus.OK)
    );
    (window as any).google  = {maps: {places: {
      PlacesServiceStatus: {OK: 'OK'},
      PlacesService: () => googlePlacesServiceSpy
    }}};

    service.getPlace(testPlaceDetails.id).subscribe((googlePlace: GooglePlace) => {
      expect(mapLoaderSpy.load).toHaveBeenCalledTimes(1);
      expect(googlePlace.id).toEqual(testPlaceDetails.id);
      expect(googlePlacesServiceSpy.getDetails).toHaveBeenCalledTimes(1);
      onExpectationsMet();
      delete (window as any).google;
    });
  });

  it('raises errors that occur when requesting Place details via GooglePlacesService', (onExpectationsMet) => {
    const service: GooglePlacesAPIClientService = TestBed.get(GooglePlacesAPIClientService);
    (window as any).google = {maps: {places: {PlacesServiceStatus: {OK: 'OK'}}}};

    const testPlaceDetails = {id: 'placeId'};
    const googlePlacesServiceSpy = jasmine.createSpyObj('PlacesService', ['getDetails']);
    const getDetailsSpy = googlePlacesServiceSpy.getDetails.and.callFake(
      (requestObj, callback) => callback({}, 'invalid')
    );
    service.googlePlacesServiceSubject = new BehaviorSubject<any>(googlePlacesServiceSpy);

    service.getPlace(testPlaceDetails.id).subscribe(
      (googlePlace: GooglePlace) => {},
      (error: any) => {
        expect(error).toEqual('invalid');
        onExpectationsMet();
        delete (window as any).google;
      }
    );
  });
});
