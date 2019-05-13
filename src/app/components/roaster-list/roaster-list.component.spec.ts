import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Roaster } from '../../models/roaster';
import { RoasterListComponent } from './roaster-list.component';

describe('RoasterListComponent', () => {
  let component: RoasterListComponent;
  let fixture: ComponentFixture<RoasterListComponent>;

  const dutchRoasters: Array<Roaster> = [
    new Roaster({
      name: 'Screaming Beans',
      website: '',
      googlePlaceId: 'ChIJobHenXUJxkcRwZXqlB-XlzA',
      lat: 52.368894,
      lng: 4.8814448,
      city: 'Amsterdam',
      country: 'The Netherlands',
      createdAt: 1553696175082,
      modifiedAt: 1553696175082
    })
  ];
  const belgianRoasters: Array<Roaster> = [
    new Roaster({
      name: 'Caffènation Antwerp City Center',
      website: 'https://caffenation.be',
      googlePlaceId: 'ChIJl_Tey-T2w0cRva2dvNTHwDg',
      lat: 51.2114802,
      lng: 4.4051755,
      city: 'Antwerp',
      country: 'Belgium',
      createdAt: 1553696175082,
      modifiedAt: 1553696175082
    })
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterListComponent);
    component = fixture.componentInstance;

    const allRoasters = component.roasters = [...dutchRoasters, ...belgianRoasters];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('groups roasters by country', () => {
    expect(component.roastersByCountry).toEqual(
      jasmine.objectContaining({'The Netherlands': dutchRoasters}));
    expect(component.roastersByCountry).toEqual(
      jasmine.objectContaining({Belgium: belgianRoasters}));
  });

  it('renders sub-titles for each Country', () => {
    const countryTitleNodes = fixture.nativeElement.querySelectorAll('h3.countryTitle');
    const countryTitles = Array.from(countryTitleNodes.values()).map((node: Element) => node.innerHTML);
    expect(countryTitles.sort()).toEqual(['Belgium', 'The Netherlands']);
  });

  it('renders each Roaster', () => {
    const roasterNodes = fixture.nativeElement.querySelectorAll('span.roasterName');
    const roasterNames = Array.from(roasterNodes.values()).map((node: Element) => node.innerHTML);
    expect(roasterNames.sort()).toEqual(['Caffènation Antwerp City Center', 'Screaming Beans']);
  });
});
