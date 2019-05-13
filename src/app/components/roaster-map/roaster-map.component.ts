import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;
import * as Sentry from '@sentry/browser';

import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import { GooglePlacesAPIClientService } from '../../services/google-places-api-client/google-places-api-client.service';
import { RoastersService } from '../../services/roasters/roasters.service';
import { Roaster } from '../../models/roaster';
import { GooglePlace } from '../../models/google-place';
import { ConnectivityService } from '../../services/connectivity/connectivity.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Component({
  selector: 'app-roaster-map',
  templateUrl: './roaster-map.component.html',
  styleUrls: ['./roaster-map.component.scss']
})
export class RoasterMapComponent implements OnInit, AfterViewInit  {
  static readonly DEFAULT_LAT = 35.784;
  static readonly DEFAULT_LNG = -90.00;
  static readonly DEFAULT_ZOOM = 2;

  roasterDetailsCanvas: any;
  @Input() roasters: Array<Roaster>;
  @Input() selectedRoaster: Roaster;

  markerImageDefault = {
    url: 'assets/images/map-markers/pin-solid.svg',
    scaledSize: {
      height: 20,
      width: 20
    }
  };

  lat = RoasterMapComponent.DEFAULT_LAT;
  lng = RoasterMapComponent.DEFAULT_LNG;
  roasterMapZoom = RoasterMapComponent.DEFAULT_ZOOM;

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
    private geolocationService: GeolocationService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private googlePlacesAPIClientService: GooglePlacesAPIClientService,
    private roastersService: RoastersService) { }

  ngOnInit() {
    this.geolocationService.getCurrentPosition().subscribe(
      location => {
        if (location) {
          this.lat = location.coords.latitude;
          this.lng = location.coords.longitude;
          this.roasterMapZoom = 7;
        }
      },
      error => {
        Sentry.captureException(error);
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
    this.googleAnalyticsService.sendEvent('roasters', 'viewDetails', roaster.googlePlaceId, 1);
  }
}
