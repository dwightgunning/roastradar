import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AppComponent } from './app.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  }
};

@Component({selector: 'app-top-nav-bar', template: ''})
class TopNavBarStubComponent {}

@Component({selector: 'app-footer-bar', template: ''})
class FooterBarStubComponent {}

// tslint:disable-next-line:component-selector
@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgcCookieConsentModule.forRoot(cookieConfig)
      ],
      declarations: [
        AppComponent,
        FooterBarStubComponent,
        TopNavBarStubComponent,
        RouterOutletStubComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

});
