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

  public getCurrentPosition(): Observable<Position> {
    if (this.geolocationEnabled) {
      return new Observable(observer => {
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
                observer.next(position);
                observer.complete();
            },
            (positionError: PositionError) => {
              observer.next(null);
              observer.complete();
            }
        );
      });
    } else {
      return of(null); // tslint:disable-line deprecation
    }
  }
}
