import { Injectable } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { from, Observable, of } from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GooglePlace } from '../../models/google-place';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesAPIClientService {
  private googlePlacesService: google.maps.places.PlacesService;
  private googlePlacesFields = ['formatted_address', 'geometry', 'icon', 'id',
                                'name', 'permanently_closed', 'photo',
                                'place_id', 'plus_code', 'type', 'url',
                                'user_ratings_total', 'rating',
                                'international_phone_number', 'opening_hours'];

  constructor(private mapLoader: MapsAPILoader) { }

  initService() {
    this.googlePlacesService =
      new google.maps.places.PlacesService(document.createElement('div'));
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.googlePlacesService) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initService()),
        map(() => true)
      );
    }
    return of(true);
  }

  public getPlace(placeId: string): Observable<GooglePlace> {
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        return new Observable<GooglePlace>(observer => {
          this.googlePlacesService.getDetails({
              placeId,
              fields: this.googlePlacesFields
            }, (result, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              observer.next(Object.assign({}, result));
            } else {
                console.log('Error - ', result, ' & Status - ', status);
                observer.next({});
            }
            observer.complete();
          });
        });
      })
    );
  }

}
