import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { init as sentryInit } from '@sentry/browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/screens/home/home.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AboutComponent } from './components/screens/about/about.component';
import { RoasterDetailsComponent } from './components/roaster-details/roaster-details.component';
import { EncodeURIComponentPipe } from './pipes/encode-uricomponent.pipe';
import { ContributeComponent } from './components/screens/contribute/contribute.component';
import { TermsPrivacyComponent } from './components/screens/terms-privacy/terms-privacy.component';
import { RoasterMapComponent } from './components/roaster-map/roaster-map.component';
import { RoasterListComponent } from './components/roaster-list/roaster-list.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.COOKIE_DOMAIN
  },
  position: 'bottom-right',
  theme: 'block',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#f1d600',
      text: '#000000',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
    policy: 'Cookie Policy'
  }
};

sentryInit({
  dsn: environment.SENTRY_DSN_PUBLIC
});

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ContributeComponent,
    EncodeURIComponentPipe,
    FooterBarComponent,
    HomeComponent,
    RoasterDetailsComponent,
    RoasterListComponent,
    RoasterMapComponent,
    TermsPrivacyComponent,
    TopNavBarComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
