import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Roaster } from '../../models/roaster';

@Injectable({
  providedIn: 'root'
})
export class RoastersService {

  constructor(private httpClient: HttpClient) { }

  public getRoasters(): Observable<Roaster[]> {
    const dataUrl = 'data.json';
    return this.httpClient.get<Roaster[]>(dataUrl).pipe(
      map(roasters => roasters.map((roasterObj) => new Roaster(roasterObj)))
    );
  }
}
