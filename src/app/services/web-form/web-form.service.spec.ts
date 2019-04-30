import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { WebFormService } from './web-form.service';

describe('WebFormService', () => {
  let webFormService: WebFormService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    // Inject the service and test controller for each test
    webFormService = TestBed.get(WebFormService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(webFormService).toBeTruthy();
  });

  it('sends a POST request via the HttpClient service', (onExpectationsMet) => {
    const testFields = {
      name: 'test contributor',
      contribution: 'my message',
      email: 'test@tester.com'
    };
    const encodedFormKeys = Object.keys(testFields).concat(['_to', 'source']);
    const expectedRequestBody = Object.assign(
      {},
      testFields,
      {_to: environment.CONTRIBUTION_FORM_RECIPIENT, source: 'roastradar'}
    );

    webFormService.submitContributionForm(testFields).subscribe(
      (data) => {
        expect(data).toBeNull();
        onExpectationsMet();
      });

    const req = httpTestingController.expectOne(environment.CONTRIBUTION_FORM_ENDPOINT);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
    expect(
        req.request.body.keys().reduce(
          (acc, key) => Object.assign(
            {},
            acc,
            {[key]: req.request.body.get(key)}
          ),
          {}))
      .toEqual(expectedRequestBody);
    req.flush(null, {status: 201, statusText: 'Ok'});
  });

  it('handles POST errors', (onExpectationsMet) => {
    const testFields = {
      name: 'test contributor',
      contribution: 'my message',
      email: 'test@tester.com'
    };
    const errorMessage = 'simulated network error';
    const mockError = new ErrorEvent('Network error', {
      message: errorMessage,
    });

    webFormService.submitContributionForm(testFields).subscribe(
      (data) => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(errorMessage);
        onExpectationsMet();
      }
    );

    const req = httpTestingController.expectOne(environment.CONTRIBUTION_FORM_ENDPOINT);
    req.error(mockError);
  });
});
