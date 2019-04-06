import { Component, OnInit } from '@angular/core';

import { NgcCookieConsentService } from 'ngx-cookieconsent';
import * as WebFont from 'webfontloader';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Roast Radar';
  initializeSubscription;

  constructor(private ccService: NgcCookieConsentService) {}

  ngOnInit() {
    // Foundation CSS
    $(document).foundation();

    // Webfonts
    WebFont.load({
      google: {
      families: ['Montserrat', 'Open+Sans']
      }
    });
  }
}
