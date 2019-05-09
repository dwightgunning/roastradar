import { Injectable } from '@angular/core';

import { ConnectableObservable, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  public static readonly OFFLINE_EVENT = 'offline';
  public static readonly ONLINE_EVENT = 'online';
  private connectedStatus: Observable<boolean>;
  private connectivityObserver: ConnectableObservable<boolean>;

  constructor() { }

  initConnectivityObserver() {

    this.connectedStatus = new Observable(
      (connectivityStateObserver) => {
        // Setup online/offline event listeners to emit new connectivity state
        const setNewConnectivityState = connectionState => () => connectivityStateObserver.next(connectionState);
        window.addEventListener(ConnectivityService.OFFLINE_EVENT, setNewConnectivityState(false));
        window.addEventListener(ConnectivityService.ONLINE_EVENT, setNewConnectivityState(true));

        // Emit the current connectivity state
        connectivityStateObserver.next(navigator.onLine);

        return () => {
          window.removeEventListener(ConnectivityService.OFFLINE_EVENT, setNewConnectivityState);
          window.removeEventListener(ConnectivityService.ONLINE_EVENT, setNewConnectivityState);
        };
      }
    );

    // Publish a multicast ReplaySubject that emits the most recent connectivity status
    this.connectivityObserver = this.connectedStatus.pipe(
      shareReplay({bufferSize: 1, refCount: true})) as ConnectableObservable<boolean>;
  }

  connectivity(): Observable<boolean> {
    if (!this.connectivityObserver) {
      this.initConnectivityObserver();
    }
    return this.connectivityObserver;
  }
}
