import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { ConnectivityService } from './connectivity.service';

describe('ConnectivityService', () => {
  let addEventListenerSpy;
  let navigatorOnlineSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    addEventListenerSpy = spyOn(window, 'addEventListener').and.callThrough();
    removeEventListenerSpy = spyOn(window, 'removeEventListener').and.callThrough();
    navigatorOnlineSpy = spyOnProperty(window.navigator, 'onLine');
  });

  it('should be created without adding listeners or retrieving online state', () => {
    const service: ConnectivityService = TestBed.get(ConnectivityService);
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(0);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(0);
  });

  it('emits initial connectivity state (online) from \'navigator.onLine\' when subscribed to', (onExpectationsMet) => {
    const onlineState = true;
    navigatorOnlineSpy.and.returnValue(onlineState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const connectivitySub = service.connectivity().subscribe((online: boolean) => {
      expect(online).toBeTruthy();
      onExpectationsMet();
    });
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    connectivitySub.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('emits initial connectivity state (offline) from \'navigator.onLine\' when first subscribed to', (onExpectationsMet) => {
    const onlineState = false;
    navigatorOnlineSpy.and.returnValue(onlineState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const connectivitySub = service.connectivity().subscribe((online: boolean) => {
      expect(online).toBeFalsy();
      onExpectationsMet();
    });
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    connectivitySub.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('emits connectivity changes recieved via window event listeners', (onExpectationsMet) => {
    const initialNavigatorState = false;
    const updatedConnectivityEvents = ['online', 'offline', 'offline', 'online'];
    const expectedConnectivityStates = [false, true, false, false, true];

    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const connectivitySub = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates.shift());
        if (!expectedConnectivityStates.length) {
          onExpectationsMet();
        }
      }
    );
    updatedConnectivityEvents.forEach(
      connectivityEvent => window.dispatchEvent(new Event(connectivityEvent)));
    connectivitySub.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('emits connectivity changes to multiple subscribers', (onExpectationsMet) => {
    const initialNavigatorState = false;
    const connectivityEvents = ['online', 'offline', 'offline', 'online'];
    const expectedConnectivityStates1 = [false, true, false, false, true];
    const expectedConnectivityStates2 = [false, true, false, false, true];

    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const checkExpectations = () => {
      if (!expectedConnectivityStates1.length && !expectedConnectivityStates2.length) {
        onExpectationsMet();
      }
    };

    const connectivitySub1 = service.connectivity().subscribe(
      (onlineState: boolean) => {
        expect(onlineState).toEqual(expectedConnectivityStates1.shift());
        checkExpectations();
      }
    );

    const connectivitySub2 = service.connectivity().subscribe(
      (onlineState: boolean) => {
        expect(onlineState).toEqual(expectedConnectivityStates2.shift());
        checkExpectations();
      }
    );
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    connectivityEvents.forEach(
      connectivityEvent => window.dispatchEvent(new Event(connectivityEvent)));
    connectivitySub1.unsubscribe();
    connectivitySub2.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('reconnects and emits further connectivity changes', (onExpectationsMet) => {
    const initialNavigatorState = false;
    const connectivityEvents1 = ['online', 'offline', 'offline', 'online'];
    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const expectedConnectivityStates1 = [false, true, false, false, true];

    const connectivitySub1 = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates1.shift());
        if (!expectedConnectivityStates1.length) {
          onExpectationsMet();
        }
      }
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    connectivityEvents1.forEach(
      connectivityEvent => window.dispatchEvent(new Event(connectivityEvent)));
    connectivitySub1.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);

    // starts with the last emitted event
    navigatorOnlineSpy.and.returnValue(true);
    const connectivityEvents2 = ['offline', 'online', 'online'];
    const expectedConnectivityStates2 = [true, false, true, true];

    const connectivitySub2 = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates2.shift());
        if (!expectedConnectivityStates2.length) {
          onExpectationsMet();
        }
      }
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(4);

    connectivityEvents2.forEach((connectivityEvent) => {
      window.dispatchEvent(new Event(connectivityEvent));
    });
    connectivitySub2.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(4);
  });
});
