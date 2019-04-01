import { AfterViewInit, Component, EventEmitter, ElementRef, Input } from '@angular/core';

declare let $: any;

import { AgmCoreModule } from '@agm/core';

import { GooglePlacesAPIClientService } from '../../../services/GooglePlacesAPIClientService/google-places-api-client.service';

import { Roaster } from '../../../models/roaster';
import { GooglePlace } from '../../../models/google-place';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  roasterDetailsCanvas: any;
  markerImageDefault = {
    url: 'assets/images/map-marker-solid.svg',
    scaledSize: {
      height: 20,
      width: 20
    }
  };
  @Input() selectedRoaster: Roaster;
  lat = 35.784;
  lng = -90;

  roasters: Array<Roaster> = [
    {
      city: 'Amsterdam',
      createdAt: new Date(1553696175082),
      googlePlaceId: 'ChIJobHenXUJxkcRwZXqlB-XlzA',
      location: {
        lat: 52.368894,
        lng: 4.8814448
      },
      modifiedAt: new Date(1553696175082),
      name: 'Screaming Beans',
    },
    {
      city: 'Antwerp',
      createdAt: new Date(1553696175082),
      googlePlaceId: 'ChIJl_Tey-T2w0cRva2dvNTHwDg',
      location: {
        lat: 51.2114802,
        lng: 4.4051755
      },
      modifiedAt: new Date(1553696175082),
      name: 'Caffènation Antwerp City Center',
      website: 'https://caffenation.be/',
    },
    {
      city: 'Berlin',
      createdAt: new Date(1553696175082),
      googlePlaceId: 'ChIJe-xsRDFOqEcR9oMD5MR9wCo',
      location: {
        lat: 52.5034573,
        lng: 13.4202408
      },
      name: 'Bonanza Coffee Roasters',
      modifiedAt: new Date(1553696175082),
      website: 'https://bonanzacoffee.de',
    },
  ];

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

  constructor(private el: ElementRef, private googlePlacesAPIClientService: GooglePlacesAPIClientService) { }

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
  }
}
