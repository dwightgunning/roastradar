import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { Roaster } from '../../../models/roaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  markerImageDefault = {
    url: 'assets/images/map-marker-solid.svg',
    scaledSize: {
      height: 20,
      width:20
    }
  };

  lat: number = 35.784;
  lng: number = -90;

  roasters: Array<Roaster> = [
    {
      city: "Amsterdam",
      location: {
        lat: 52.368894,
        lng: 4.8814448
      },
      name: "Screaming Beans"
    },
    {
      city: "Antwerp",
      location: {
        lat: 51.2114802,
        lng: 4.4051755
      },
      name: "Caffènation",
      website: "https://caffenation.be/"
    },
    {
      city: "Berlin",
      location: {
        lat: 52.5034573,
        lng: 13.4202408
      },
      name: "Bonanza Coffee Roasters",
      website: "https://bonanzacoffee.de"
    },
  ]

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
        { 'color': '#C0C0C0' }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { 'color': '#E0E0E0' }
      ]
    },
    {
      featureType: 'administrative',
      stylers: [
        { visibility: 'on' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
