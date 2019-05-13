import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { ConnectivityService } from '../../services/connectivity/connectivity.service';
import { environment } from '../../../environments/environment';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { GooglePlace } from '../../models/google-place';
import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import { GooglePlacesAPIClientService } from '../../services/google-places-api-client/google-places-api-client.service';
import { Roaster } from '../../models/roaster';
import { RoasterMapComponent } from './roaster-map.component';
import { RoastersService } from '../../services/roasters/roasters.service';

@Component({
  selector: 'app-roaster-details',
  template: ''
})
class StubRoasterDetailsComponent {
  @Input() roaster = new Roaster();
}

describe('RoasterMapComponent', () => {
  let component: RoasterMapComponent;
  let fixture: ComponentFixture<RoasterMapComponent>;

  let connectivitySubject;
  let connectivityServiceStub;
  let geolocationServiceStub;
  let googleAnalyticsServiceStub;
  let googlePlacesAPIClientServiceStub;
  let roastersServiceStub;

  beforeEach(async(() => {
    roastersServiceStub = jasmine.createSpyObj('RoastersService', ['getRoasters']);
    connectivitySubject = new BehaviorSubject(true);
    connectivityServiceStub = jasmine.createSpyObj('ConnectivityService', ['connectivity']);
    geolocationServiceStub = jasmine.createSpyObj('GeolocationService', ['getCurrentPosition']);
    googleAnalyticsServiceStub = jasmine.createSpyObj('GoogleAnalyticsService', ['sendEvent']);
    googlePlacesAPIClientServiceStub = jasmine.createSpyObj('GooglePlacesAPIClientService', ['getPlace']);

    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
        AgmJsMarkerClustererModule
      ],
      declarations: [
        StubRoasterDetailsComponent,
        RoasterMapComponent
      ],
      providers: [
        {provide: RoastersService, useValue: roastersServiceStub },
        {provide: GeolocationService, useValue: geolocationServiceStub },
        {provide: GoogleAnalyticsService, useValue: googleAnalyticsServiceStub },
        {provide: GooglePlacesAPIClientService, useValue: googlePlacesAPIClientServiceStub },
      ]
    })
    .compileComponents();
  }));

  describe('geolocation error on intialisation', () => {

    beforeEach(() => {
      connectivityServiceStub.connectivity.and.returnValue(connectivitySubject);
      // tslint:disable-next-line:deprecation
      geolocationServiceStub.getCurrentPosition.and.returnValue(throwError(null));

      fixture = TestBed.createComponent(RoasterMapComponent);
      component = fixture.componentInstance;
      component.roasters = [new Roaster()];
      fixture.detectChanges();
    });

    it('sets the map to the default location', () => {
      expect(component.lat).toEqual(RoasterMapComponent.DEFAULT_LAT);
      expect(component.lat).toEqual(RoasterMapComponent.DEFAULT_LAT);
      expect(component.roasterMapZoom).toEqual(RoasterMapComponent.DEFAULT_ZOOM);
    });
  });

  describe('disabled geolocation on intialisation', () => {

    beforeEach(() => {
      connectivityServiceStub.connectivity.and.returnValue(connectivitySubject);
      // tslint:disable-next-line:deprecation
      geolocationServiceStub.getCurrentPosition.and.returnValue(of(null));

      fixture = TestBed.createComponent(RoasterMapComponent);
      component = fixture.componentInstance;
      component.roasters = [new Roaster()];
      fixture.detectChanges();
    });

    it('sets the map to the default location', () => {
      expect(component.lat).toEqual(RoasterMapComponent.DEFAULT_LAT);
      expect(component.lat).toEqual(RoasterMapComponent.DEFAULT_LAT);
      expect(component.roasterMapZoom).toEqual(RoasterMapComponent.DEFAULT_ZOOM);
    });
  });

  describe('behaves on expected intialisation', () => {

    beforeEach(() => {
      connectivityServiceStub.connectivity.and.returnValue(connectivitySubject);
      // tslint:disable-next-line:deprecation
      geolocationServiceStub.getCurrentPosition.and.returnValue(of({coords: {latitude: 0, longitude: 0}}));

      fixture = TestBed.createComponent(RoasterMapComponent);
      component = fixture.componentInstance;
      component.roasters = [new Roaster()];
      fixture.detectChanges();
    });

    it('handles roaster click', () => {
      const expectedRoasterPlaceDetails = new GooglePlace();
      // tslint:disable-next-line deprecation
      googlePlacesAPIClientServiceStub.getPlace.and.returnValue(of(expectedRoasterPlaceDetails));

      component.onRoasterClicked(component.roasters[0]);
      expect(googleAnalyticsServiceStub.sendEvent).toHaveBeenCalledTimes(1);
      expect(component.roasters[0].googlePlace).toEqual(expectedRoasterPlaceDetails);
    });

    // TODO: Test that map markers are rendered according to the input list of roasters
    // TODO: Test that map offers to update location when location change detected
  });
});
