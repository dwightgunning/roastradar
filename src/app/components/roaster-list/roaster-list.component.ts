import { Component, Input, OnInit } from '@angular/core';

import { Roaster } from '../../models/roaster';

@Component({
  selector: 'app-roaster-list',
  templateUrl: './roaster-list.component.html',
  styleUrls: ['./roaster-list.component.scss']
})
export class RoasterListComponent implements OnInit {
  inputRoasters: Array<Roaster>;
  roastersByCountry: object;

  @Input('roasters')
  set roasters(val: Array<Roaster>) {
    this.inputRoasters = val;
    // Reduce list to an object keyed by country
    this.roastersByCountry = this.inputRoasters.reduce(
      (groupedRoasters, roaster) => {
        groupedRoasters[roaster.country] = groupedRoasters[roaster.country] || [];
        groupedRoasters[roaster.country].push(roaster);
        return groupedRoasters;
      }, {});
  }

  @Input() selectedRoaster: Roaster;

  constructor() { }

  ngOnInit() { }

}
