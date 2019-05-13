import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject, of } from 'rxjs';

import { EncodeURIComponentPipe } from '../../../pipes/encode-uricomponent.pipe';
import { HomeComponent } from './home.component';
import { Roaster } from '../../../models/roaster';
import { RoastersService } from '../../../services/roasters/roasters.service';
import { ConnectivityService } from '../../../services/connectivity/connectivity.service';

@Component({
  selector: 'app-roaster-map',
  template: ''
})
class StubRoasterMapComponent {
  @Input() roasters = new Array<Roaster>();
  @Input() selectedRoaster = new Roaster();
}

@Component({
  selector: 'app-roaster-list',
  template: ''
})
class StubRoasterListComponent {
  @Input() roasters = new Array<Roaster>();
  @Input() selectedRoaster = new Roaster();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let connectivitySubject;
  let connectivityServiceStub;

  beforeEach(async(() => {
    const roastersServiceSpy = jasmine.createSpyObj('RoastersService', ['getRoasters']);
    // tslint:disable-next-line:deprecation
    roastersServiceSpy.getRoasters.and.returnValue(of(
      [
        {
          name: 'Screaming Beans',
          website: '',
          googlePlaceId: 'ChIJobHenXUJxkcRwZXqlB-XlzA',
          lat: 52.368894,
          lng: 4.8814448,
          city: 'Amsterdam',
          country: 'The Netherlands',
          createdAt: 1553696175082,
          modifiedAt: 1553696175082
        },
        {
          name: 'Caffènation Antwerp City Center',
          website: 'https://caffenation.be',
          googlePlaceId: 'ChIJl_Tey-T2w0cRva2dvNTHwDg',
          lat: 51.2114802,
          lng: 4.4051755,
          city: 'Antwerp',
          country: 'Belgium',
          createdAt: 1553696175082,
          modifiedAt: 1553696175082
        }
      ]
  ));
    connectivitySubject = new BehaviorSubject(true);
    connectivityServiceStub = jasmine.createSpyObj('ConnectivityService', ['connectivity']);
    connectivityServiceStub.connectivity.and.returnValue(connectivitySubject);

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        StubRoasterMapComponent,
        StubRoasterListComponent
      ],
      providers: [
        {provide: RoastersService, useValue: roastersServiceSpy },
        {provide: ConnectivityService, useValue: connectivityServiceStub }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isConnected).toBeTruthy();
    expect(component.mode).toEqual('map');
  });

  it('retrieves roasters', () => {
    expect(component).toBeTruthy();
    const roastersServiceSpy = TestBed.get(RoastersService);
    expect(roastersServiceSpy.getRoasters).toHaveBeenCalledTimes(1);
  });

  it('handles disconnection', () => {
    connectivitySubject.next(false);
    expect(component.isConnected).toBeFalsy();
    expect(component.mode).toEqual('list');
  });

});
