import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EncodeURIComponentPipe } from '../../pipes/encode-uricomponent.pipe';
import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import { Roaster } from '../../models/roaster';
import { RoasterDetailsComponent } from './roaster-details.component';

@Component({
  template: ''
})
class StubComponent { }

describe('RoasterDetailsComponent', () => {
  let component: RoasterDetailsComponent;
  let fixture: ComponentFixture<RoasterDetailsComponent>;
  const googleAnalyticsService = jasmine.createSpyObj('GoogleAnalyticsService', ['sendEvent']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoasterDetailsComponent,
        EncodeURIComponentPipe,
        StubComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: StubComponent }
        ])
      ],
      providers: [
        { provide: GoogleAnalyticsService, useValue: googleAnalyticsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends event when a roaster is clicked', () => {
    component.roaster = new Roaster();
    component.roaster.googlePlaceId = 'googlePlaceId';
    component.onRoasterLinkClick('roasterLink');
    expect(googleAnalyticsService.sendEvent).toHaveBeenCalledWith('roasters', 'link-click-roasterLink', component.roaster.googlePlaceId, 1);
  });
});
