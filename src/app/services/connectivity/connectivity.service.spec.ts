import { TestBed } from '@angular/core/testing';

import { ConnectivityService } from './connectivity.service';

describe('ConnectivityService', () => {
  let onlineState;
  let addEventListenerSpy;
  let navigatorOnlineSpy;
  let listeners;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    addEventListenerSpy = spyOn(window, 'addEventListener');
    navigatorOnlineSpy = spyOnProperty(window.navigator, 'onLine');
    listeners = {};
    addEventListenerSpy.and.callFake((event, listener) => {
      if (!listeners[event]) {
        listeners[event] = [listener];
      } else {
        listeners[event].append(listener);
      }
    });
  });

  afterEach(() => {
    expect(navigatorOnlineSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith('offline', jasmine.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('online', jasmine.any(Function));
  });

  it('should be created (online)', (onExpectationsMet) => {
    onlineState = true;
    navigatorOnlineSpy.and.returnValue(onlineState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    service.connectivity().subscribe((online: boolean) => {
      expect(online).toBe(onlineState);
      onExpectationsMet();
    });
  });

  it('should be created (offline)', (onExpectationsMet) => {
    onlineState = false;
    navigatorOnlineSpy.and.returnValue(onlineState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);

    service.connectivity().subscribe((online: boolean) => {
      expect(online).toBe(onlineState);
      onExpectationsMet();
    });
  });

  it('emits online events', (onExpectationsMet) => {
    const initialNavigatorState = false;
    const updatedConnectivityEvent = 'online';
    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);
    listeners[updatedConnectivityEvent].forEach((listener) => listener());

    service.connectivity().subscribe(
      (online) => {
        expect(online).toBe(true);
        onExpectationsMet();
      }
    );
  });

  it('emits offline events', (onExpectationsMet) => {
    const initialNavigatorState = true;
    const updatedConnectivityEvent = 'offline';
    navigatorOnlineSpy.and.returnValue(initialNavigatorState);
    const service: ConnectivityService = TestBed.get(ConnectivityService);
    listeners[updatedConnectivityEvent].forEach((listener) => listener());

    service.connectivity().subscribe(
      (online) => {
        expect(online).toBe(false);
        onExpectationsMet();
      }
    );
  });

});
