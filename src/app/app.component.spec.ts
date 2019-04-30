import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AboutComponent } from './components/screens/about/about.component';
import { AppComponent } from './app.component';
import { ContributeComponent } from './components/screens/contribute/contribute.component';
import { environment } from '../environments/environment';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { HomeComponent } from './components/screens/home/home.component';
import { RoasterDetailsComponent } from './components/roaster-details/roaster-details.component';
import { TermsPrivacyComponent } from './components/screens/terms-privacy/terms-privacy.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { EncodeURIComponentPipe } from './pipes/encode-uricomponent.pipe';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  }
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
        AgmJsMarkerClustererModule,
        FormsModule,
        RouterTestingModule,
        NgcCookieConsentModule.forRoot(cookieConfig)
      ],
      declarations: [
        AppComponent,
        ContributeComponent,
        HomeComponent,
        TopNavBarComponent,
        FooterBarComponent,
        AboutComponent,
        EncodeURIComponentPipe,
        RoasterDetailsComponent,
        TermsPrivacyComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Roast Radar'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Roast Radar');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Roast Radar');
  });
});
