import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { RoastersService } from './roasters.service';

describe('RoastersService', () => {
  let roastersService: RoastersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    roastersService = TestBed.get(RoastersService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(roastersService).toBeTruthy();
  });

  it('gets roasters data', (onExpectationsMet) => {
    const testRoasters = [
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
      ];

    roastersService.getRoasters().subscribe(
      (roasters) => {
        expect(roasters.length).toEqual(testRoasters.length);
        onExpectationsMet();
      }
    );

    const req = httpTestingController.expectOne('data.json');
    expect(req.request.method).toEqual('GET');

    req.flush(testRoasters);
  });
});
