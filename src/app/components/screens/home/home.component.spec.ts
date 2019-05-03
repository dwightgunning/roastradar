import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { BehaviorSubject, of } from 'rxjs';

import { AboutComponent } from '../about/about.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { ContributeComponent } from '../contribute/contribute.component';
import { EncodeURIComponentPipe } from '../../../pipes/encode-uricomponent.pipe';
import { environment } from '../../../../environments/environment';
import { HomeComponent } from './home.component';
import { RoasterDetailsComponent } from '../../roaster-details/roaster-details.component';
import { TermsPrivacyComponent } from '../terms-privacy/terms-privacy.component';
import { GooglePlace } from '../../../models/google-place';
import { GoogleAnalyticsService } from '../../../services/google-analytics/google-analytics.service';
import { GooglePlacesAPIClientService } from '../../../services/google-places-api-client/google-places-api-client.service';
import { RoastersService } from '../../../services/roasters/roasters.service';
import { ConnectivityService } from '../../../services/connectivity/connectivity.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let connectivitySubject;
  let connectivityServiceStub;
  let geolocationServiceStub;
  let googleAnalyticsServiceStub;
  let googlePlacesAPIClientServiceStub;

  beforeEach(async(() => {
    const roastersServiceStub = jasmine.createSpyObj('RoastersService', ['getRoasters']);
    // tslint:disable-next-line:deprecation
    roastersServiceStub.getRoasters.and.returnValue(of(
      [
        {
          name: 'Screaming Beans',
          website: '',
          googlePlaceId: 'ChIJobHenXUJxkcRwZXqlB-XlzA',
          lat: 52.368894,
          lng: 4.8814448,
          city: 'Amsterdam',
          country: 'The Netherlands',
          createdAt: 1553696175082,
          modifiedAt: 1553696175082
        },
        {
          name: 'Caffènation Antwerp City Center',
          website: 'https://caffenation.be',
          googlePlaceId: 'ChIJl_Tey-T2w0cRva2dvNTHwDg',
          lat: 51.2114802,
          lng: 4.4051755,
          city: 'Antwerp',
          country: 'Belgium',
          createdAt: 1553696175082,
          modifiedAt: 1553696175082
        }
      ]
  ));
    connectivitySubject = new BehaviorSubject(true);
    connectivityServiceStub = jasmine.createSpyObj('ConnectivityService', ['connectivity']);
    connectivityServiceStub.connectivity.and.returnValue(connectivitySubject);
    geolocationServiceStub = jasmine.createSpyObj('GeolocationService', ['getCurrentPosition']);
    // tslint:disable-next-line:deprecation
    geolocationServiceStub.getCurrentPosition.and.returnValue(of({coords: {latitude: 0, longitude: 0}}));
    googleAnalyticsServiceStub = jasmine.createSpyObj('GoogleAnalyticsService', ['sendEvent']);
    googlePlacesAPIClientServiceStub = jasmine.createSpyObj('GooglePlacesAPIClientService', ['getPlace']);

    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
        AgmJsMarkerClustererModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AboutComponent,
        ContributeComponent,
        EncodeURIComponentPipe,
        HomeComponent,
        RoasterDetailsComponent,
        TermsPrivacyComponent
      ],
      providers: [
        {provide: RoastersService, useValue: roastersServiceStub },
        {provide: GoogleAnalyticsService, useValue: googleAnalyticsServiceStub },
        {provide: GooglePlacesAPIClientService, useValue: googlePlacesAPIClientServiceStub },
        {provide: ConnectivityService, useValue: connectivityServiceStub },
        {provide: GeolocationService, useValue: geolocationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // TODO: Clean this business up... I think we should be stubbing the service?
    (window as any).ga = jasmine.createSpy('ga');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    (window as any).ga = undefined;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isConnected).toBeTruthy();
    expect(component.mode).toEqual('map');
  });

  it('handles disconnection', () => {
    connectivitySubject.next(false);
    expect(component.isConnected).toBeFalsy();
    expect(component.mode).toEqual('list');
  });

  it('handles roaster click', () => {
    const expectedRoasterPlaceDetails = new GooglePlace();
    // tslint:disable-next-line deprecation
    googlePlacesAPIClientServiceStub.getPlace.and.returnValue(of(expectedRoasterPlaceDetails));

    component.onRoasterClicked(component.roasters[0]);
    expect(googleAnalyticsServiceStub.sendEvent).toHaveBeenCalledTimes(1);
    expect(component.roasters[0].googlePlace).toEqual(expectedRoasterPlaceDetails);
  });

});
