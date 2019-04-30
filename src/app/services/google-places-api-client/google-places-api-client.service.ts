import { Injectable } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { AsyncSubject, BehaviorSubject, from, Observable, of, Subject, throwError } from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GooglePlace } from '../../models/google-place';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesAPIClientService {
  private googlePlacesFields = ['formatted_address', 'geometry', 'icon', 'id',
                                'name', 'permanently_closed', 'photo',
                                'place_id', 'plus_code', 'type', 'url',
                                'user_ratings_total', 'rating',
                                'international_phone_number', 'opening_hours'];
  googlePlacesServiceSubject: Subject<google.maps.places.PlacesService>;

  constructor(private mapsApiLoader: MapsAPILoader) {}

  private init() {
    this.googlePlacesServiceSubject =
      new AsyncSubject<google.maps.places.PlacesService>();
    this.mapsApiLoader.load().then(
      (result: void) => {
        const googlePlacesService =
          new google.maps.places.PlacesService(document.createElement('div'));
        this.googlePlacesServiceSubject.next(googlePlacesService);
      },
      (reason: any) => {
        this.googlePlacesServiceSubject.error(reason);
      }
    ).catch((reason: any) => {
      this.googlePlacesServiceSubject.error(reason);
    }).finally(() => {
      this.googlePlacesServiceSubject.complete();
    });
  }

  public getPlace(placeId: string): Observable<GooglePlace> {
    if (!this.googlePlacesServiceSubject) {
      this.init();
    }
    return this.googlePlacesServiceSubject.pipe(
      catchError((err: any) => {
        return throwError(err);
      }),
      switchMap((googlePlacesService) => {
        return new Observable<GooglePlace>(observer => {
            googlePlacesService.getDetails({
              placeId,
              fields: this.googlePlacesFields
            },
            (result, status) => {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                observer.error(status);
              }
              observer.next(Object.assign({}, result));
              observer.complete();
            });
        }).pipe(
          catchError((err: any) => {
            return throwError(err);
          }));
      })
    );
  }
}
