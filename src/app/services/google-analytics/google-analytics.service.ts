import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private router: Router) {
    // Initialise the agent
    (window as any).ga('create', environment.GOOGLE_ANALYTICS_ID, 'auto');

    // Subscribe to routing events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).ga('set', 'page', event.urlAfterRedirects);
        (window as any).ga('send', 'pageview');
      }
    });
  }

  public sendEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = '',
                   eventValue: number = 1) {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }

}
