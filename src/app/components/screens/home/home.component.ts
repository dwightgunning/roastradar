import { AfterViewInit, Component, EventEmitter, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;

import { AgmCoreModule } from '@agm/core';

import { GoogleAnalyticsService } from '../../../services/google-analytics/google-analytics.service';
import { GooglePlacesAPIClientService } from '../../../services/google-places-api-client/google-places-api-client.service';
import { RoastersService } from '../../../services/roasters/roasters.service';
import { Roaster } from '../../../models/roaster';
import { GooglePlace } from '../../../models/google-place';
import { ConnectivityService } from '../../../services/connectivity/connectivity.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  mode = 'map';
  isConnected: boolean;
  roastersByCountry;
  roasters: Array<Roaster>;
  roasterDetailsCanvas: any;

  markerImageDefault = {
    url: 'assets/images/map-markers/pin-solid.svg',
    scaledSize: {
      height: 20,
      width: 20
    }
  };
  @Input() selectedRoaster: Roaster;
  lat = 35.784;
  lng = -90;
  roasterMapZoom = 2;

  mapStyles = [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: '#C0C0C0' }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { color: '#E0E0E0' }
      ]
    },
    {
      featureType: 'administrative',
      stylers: [
        { visibility: 'on' }
      ]
    }
  ];

  constructor(
    private el: ElementRef,
    private roastersService: RoastersService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private googlePlacesAPIClientService: GooglePlacesAPIClientService,
    private connectivityService: ConnectivityService,
    private geolocationService: GeolocationService) { }

  ngOnInit() {
    if (!this.roasters) {
      this.roastersService.getRoasters().subscribe(response => {
        this.roasters = response;
        // Reduce list to an object keyed by country
        this.roastersByCountry = this.roasters.reduce((acc, curVal) => {
            acc[curVal.country] = [...acc[acc.country] || [], curVal];
            return acc;
          }, Object.create(null));
      });
    }

    this.connectivityService.connectivity().subscribe(isConnected => {
      this.isConnected = isConnected;
      // TODO: prompt the user to confirm they want to toggle the map/list
      this.mode = this.isConnected ? 'map' : 'list';
    });

    this.geolocationService.locationChange().subscribe(
      location => {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.roasterMapZoom = 7;
      });
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).foundation();
    this.roasterDetailsCanvas = $('#roaster-details-canvas');
  }

  onRoasterClicked(roaster: Roaster) {
    this.roasterDetailsCanvas.foundation('open');

    this.selectedRoaster = roaster;
    if (!roaster.googlePlace) {
      this.googlePlacesAPIClientService.getPlace(roaster.googlePlaceId)
        .subscribe((googlePlace: GooglePlace) => {
          roaster.googlePlace = googlePlace;
        });
    }
    this.googleAnalyticsService.eventEmitter('roasters', 'viewDetails', roaster.googlePlaceId, 1);
  }
}
