import { Injectable } from '@angular/core';

import { ConnectableObservable, Observable } from 'rxjs';
import { multicast, publishReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  public static readonly OFFLINE_EVENT = 'offline';
  public static readonly ONLINE_EVENT = 'online';
  private connectivityMonitor: Observable<boolean>;
  private connectivityObserver: ConnectableObservable<boolean>;

  constructor() { }

  initConnectivityObserver() {
    this.connectivityMonitor = new Observable(
      (connectivityStateObserver) => {
        const offlineEventListener = () => {
          connectivityStateObserver.next(false); // Browser offline -> connectivity: false
        };
        const onlineEventListener = () => {
          connectivityStateObserver.next(true); // Browser online -> connectivity: true
        };

        window.addEventListener(ConnectivityService.OFFLINE_EVENT, offlineEventListener);
        window.addEventListener(ConnectivityService.ONLINE_EVENT, onlineEventListener);

        // Emit the current connectivity
        connectivityStateObserver.next(navigator.onLine);
        return () => {
          window.removeEventListener(ConnectivityService.OFFLINE_EVENT, offlineEventListener);
          window.removeEventListener(ConnectivityService.ONLINE_EVENT, onlineEventListener);
        };
      }
    );

    // Publish a multicast ReplaySubject that emits the most recent connectivity status
    this.connectivityObserver = this.connectivityMonitor.pipe(publishReplay(1)) as ConnectableObservable<boolean>;
    this.connectivityObserver.connect();
  }

  connectivity(): Observable<boolean> {
    if (!this.connectivityObserver) {
      this.initConnectivityObserver();
    }
    return this.connectivityObserver.refCount();
  }
}
