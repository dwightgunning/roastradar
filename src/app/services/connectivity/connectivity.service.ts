import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private monitor: Observable<boolean>;
  private subject: BehaviorSubject<boolean>;

  constructor() {

    this.monitor = new Observable((observer) => {
      window.addEventListener('offline', (e) => {
        observer.next(false);
      });
      window.addEventListener('online', (e) => {
        observer.next(true);
      });
    });
    this.subject = new BehaviorSubject(navigator.onLine);
    this.monitor.subscribe(this.subject);
  }

  connectivity(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
