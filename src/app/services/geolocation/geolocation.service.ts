import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  geolocationEnabled: boolean;
  constructor() {
    this.geolocationEnabled = 'geolocation' in navigator;
  }

  public locationChange(): Observable<any> {
    return Observable.create(observer => {
        if (this.geolocationEnabled) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  observer.next(position);
                  observer.complete();
              },
              observer.error.bind(observer)
          );
        } else {
          observer.complete();
        }
      });
  }
}
