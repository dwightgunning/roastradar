import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private monitor: Observable<boolean>;
  private subject: BehaviorSubject<boolean>;

  constructor() {
    this.monitor = new Observable((connectivityObserver) => {
      // map 'offline' and 'online' window events to boolean 'connnectivity state'
      window.addEventListener('offline', () => {
        connectivityObserver.next(false);
      });
      window.addEventListener('online', () => {
        connectivityObserver.next(true);
      });
    });
    // obtain initial connectivity state from navigator.onLine property
    this.subject = new BehaviorSubject(navigator.onLine);
    this.monitor.subscribe(this.subject);
  }

  connectivity(): Observable<boolean> {
    return this.subject.asObservable();
    // TODO: Proper cleanup?
  }
}
