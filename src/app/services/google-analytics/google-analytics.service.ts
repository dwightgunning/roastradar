import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

declare let ga: (...args: any[]) => void;

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private router: Router) {
    // Initialise the agent
    ga('create', environment.GOOGLE_ANALYTICS_ID, 'auto');

    // Subscribe to routing events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  public eventEmitter(eventCategory: string,
                      eventAction: string,
                      eventLabel: string = null,
                      eventValue: number = null) {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }

}
