import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { RoastersService } from '../../../services/roasters/roasters.service';
import { Roaster } from '../../../models/roaster';
import { ConnectivityService } from '../../../services/connectivity/connectivity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  connectivitySubscription: Subscription;
  isConnected: boolean;
  mode = 'map';
  roasters: Array<Roaster>;
  @Input() selectedRoaster: Roaster;

  constructor(
    private roastersService: RoastersService,
    private connectivityService: ConnectivityService) { }

  ngOnInit() {
    if (!this.roasters) {
      this.roastersService.getRoasters().subscribe(response => {
        this.roasters = response;
      });
    }

    this.connectivitySubscription = this.connectivityService.connectivity().subscribe(isConnected => {
      this.isConnected = isConnected;
      // TODO: prompt the user to confirm they want to toggle the map/list
      this.mode = this.isConnected ? 'map' : 'list';
    });
  }

  ngOnDestroy() {
    this.connectivitySubscription.unsubscribe();
  }
}
