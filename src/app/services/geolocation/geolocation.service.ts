import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  geolocationEnabled: boolean;
  constructor() {
    this.geolocationEnabled = 'geolocation' in navigator;
  }

  public getCurrentPosition(): Observable<any> {
    if (this.geolocationEnabled) {
      // Use `create` due to getCurrentPositions' atypical signature
      return new Observable(observer => {
        navigator.geolocation.getCurrentPosition(
            position => {
                observer.next(position);
                observer.complete();
            },
            observer.error.bind(observer)
        );
      });
    } else {
      return of(null); // tslint:disable-line deprecation
    }
  }
}
