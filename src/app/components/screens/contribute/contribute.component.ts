import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

import { tap } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent {
  public submission: any = {};
  submissionResponse = '';

  constructor(private httpClient: HttpClient) { }

  submitForm() {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('_to',  environment.CONTRIBUTION_FORM_RECIPIENT)
      .set('name', this.submission.name)
      .set('email', this.submission.email)
      .set('message', this.submission.message)
      .set('_replyto', this.submission.email)
      .set('source', 'roastradar');

    this.httpClient.post(
        environment.CONTRIBUTION_FORM_ENDPOINT,
        body.toString(),
        {headers: {}}
        ).pipe(
            tap(  // Log the result or error
              (data) => this.submissionResponse = 'Success',
              (error) => this.submissionResponse = 'A problem occurred. Please try again.'
            )
        ).subscribe();
  }

}
