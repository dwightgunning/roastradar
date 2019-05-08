import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { ConnectivityService } from './connectivity.service';

describe('ConnectivityService', () => {
  let addEventListenerSpy;
  let navigatorOnlineSpy;
  let removeEventListenerSpy;
  let windowListeners;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    addEventListenerSpy = spyOn(window, 'addEventListener');
    removeEventListenerSpy = spyOn(window, 'removeEventListener');
    navigatorOnlineSpy = spyOnProperty(window.navigator, 'onLine');
    windowListeners = {};
    addEventListenerSpy.and.callFake((event, windowListener) => {
      if (!windowListeners[event]) {
        windowListeners[event] = [windowListener];
      } else {
        windowListeners[event].append(windowListener);
      }
    });
    removeEventListenerSpy.and.callFake((event, windowListener) => {
      if (event !== 'load') {
        if (!windowListeners[event]) {
          fail(`unexpected call to window.removeEventListener: ${event}`);
        } else {
          windowListeners[event].splice(windowListeners[event].indexOf(windowListener), 1);
        }
      }
    });
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
    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const expectedConnectivityStates = [false, true, false, false, true];

    const connectivitySub = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates.shift());
        onExpectationsMet();
      }
    );
    updatedConnectivityEvents.forEach((connectivityEvent) => {
      windowListeners[connectivityEvent].forEach((windowListener) => {
        windowListener();
      });
    });
    connectivitySub.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('emits connectivity changes to multiple subscribers', (onExpectationsMet) => {
    const initialNavigatorState = false;
    const updatedConnectivityEvents = ['online', 'offline', 'offline', 'online'];
    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    const expectedConnectivityStates1 = [false, true, false, false, true];
    const connectivitySub1 = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates1.shift());
        // TODO: Confirm expectations met from both async subscriptions
      }
    );

    const expectedConnectivityStates2 = [false, true, false, false, true];
    const connectivitySub2 = service.connectivity().subscribe(
      (online: boolean) => {
        expect(online).toEqual(expectedConnectivityStates2.shift());
        onExpectationsMet();
      }
    );
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    updatedConnectivityEvents.forEach((connectivityEvent) => {
      windowListeners[connectivityEvent].forEach((windowListener) => {
        windowListener();
      });
    });
    connectivitySub1.unsubscribe();
    connectivitySub2.unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

});
