import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { of, throwError } from 'rxjs';

import { ContributeComponent } from './contribute.component';
import { WebFormService } from '../../../services/web-form/web-form.service';

describe('ContributeComponent', () => {
  let component: ContributeComponent;
  let fixture: ComponentFixture<ContributeComponent>;
  const webFormServiceSpy = jasmine.createSpyObj('WebFormService', ['submitContributionForm']);
  let webFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: WebFormService, useValue: webFormServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    webFormService = TestBed.get(WebFormService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the WebFormService to send the form', (onExpectationsMet) => {
    const testServiceResponse = '_';
    component.submission = {
      name: 'test name',
      email: 'email@email.com',
      message: 'test message',
    };
    const expectedFormData = Object.assign({}, component.submission, {_replyto: component.submission.email});

    const submitContributionFormSpy = webFormService.submitContributionForm.and.callFake(
      (data) => {
        expect(submitContributionFormSpy).toHaveBeenCalledWith(expectedFormData);
        onExpectationsMet();
        return of(testServiceResponse);
      });

    component.submitForm();
    expect(component.submissionResponse).toEqual('Success');
  });

  it('should handle errors from WebFormService', (onExpectationsMet) => {
    const testServiceResponse = '_';
    const submitContributionFormSpy = webFormService.submitContributionForm.and.callFake(
      (data) => {
        onExpectationsMet();
        return throwError(new Error());
      });

    component.submitForm();
    expect(component.submissionResponse).toEqual('A problem occurred. Please try again.');
  });
});
