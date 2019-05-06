import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';

import { Roaster } from '../../models/roaster';

@Injectable({
  providedIn: 'root'
})
export class RoastersService {

  constructor(private httpClient: HttpClient) { }

  public getRoasters(): Observable<Roaster[]> {
    const dataUrl = 'data.json';
    return from(this.httpClient.get<Roaster[]>(dataUrl));
  }
}
