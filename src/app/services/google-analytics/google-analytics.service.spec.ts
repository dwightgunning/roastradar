import { async, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { GoogleAnalyticsService } from './google-analytics.service';

let gaSpy;

describe('GoogleAnalyticsService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    })
    .compileComponents();

    gaSpy = jasmine.createSpy('ga');
    (window as any).ga = gaSpy;
  }));

  afterEach(() => {
    (window as any).ga = undefined;
  });

  it('should be created', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);
    expect(service).toBeTruthy();
  });

  it('invokes \'ga()\' with the `create` action when instantiated', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);
    expect(gaSpy).toHaveBeenCalledWith('create', jasmine.any(String), 'auto');
  });

  it('sets the url and sends a page view on \'NavigationEnd\' routing events', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);

    const testAfterUrl = '/testUrl';
    const event = new NavigationEnd(1, '/', testAfterUrl);
    TestBed.get(Router).events.next(event);

    expect(gaSpy).toHaveBeenCalledWith('set', 'page', testAfterUrl);
    expect(gaSpy).toHaveBeenCalledWith('send', 'pageview');
  });

  it('sends an event when \'sendEvent()\' is invoked', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);

    const eventData = {
      eventCategory: 'eventCategory',
      eventAction: 'eventAction',
      eventLabel: 'eventLabel',
      eventValue: 1
    };

    service.sendEvent(
      eventData.eventCategory,
      eventData.eventAction,
      eventData.eventLabel,
      eventData.eventValue
    );

    expect(gaSpy).toHaveBeenCalledWith('send', 'event', eventData);
  });

  it('sends an event when \'sendEvent()\' is invoked with default args', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);

    const eventData = {
      eventCategory: 'eventCategory',
      eventAction: 'eventAction',
      eventLabel: '',
      eventValue: 1
    };

    service.sendEvent(
      eventData.eventCategory,
      eventData.eventAction
    );

    expect(gaSpy).toHaveBeenCalledWith('send', 'event', eventData);
  });
});
