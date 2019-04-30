import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebFormService {

  constructor(private httpClient: HttpClient) { }

  public submitContributionForm(fields): Observable<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams()
      .set('_to',  environment.CONTRIBUTION_FORM_RECIPIENT)
      .set('source', 'roastradar');
    body = Object.keys(fields).reduce((acc, field) => acc.set(field, fields[field]), body);
    return this.httpClient.post(
      environment.CONTRIBUTION_FORM_ENDPOINT,
      body,
      {headers}
    );
  }
}
