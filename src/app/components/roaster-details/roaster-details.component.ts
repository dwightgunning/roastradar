import { Component, Input } from '@angular/core';

import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import { Roaster } from '../../models/roaster';

@Component({
  selector: 'app-roaster-details',
  templateUrl: './roaster-details.component.html',
  styleUrls: ['./roaster-details.component.scss']
})
export class RoasterDetailsComponent {

  @Input() roaster: Roaster;

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  onRoasterLinkClick(link) {
    this.googleAnalyticsService.sendEvent(
      'roasters', 'link-click-' + link, this.roaster.googlePlaceId, 1);
  }

}
