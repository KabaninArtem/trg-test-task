import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MAP_API_KEY, MAP_API_URL } from 'src/app/providers/map.providers';

@Injectable()
export class MapService {
  private url = `${this.mapApiUrl}?key=${this.mapApiKey}`;

  constructor(
    private httpClient: HttpClient,
    @Inject(MAP_API_URL) private mapApiUrl: string,
    @Inject(MAP_API_KEY) private mapApiKey: string,
  ) { }


  load(): Observable<boolean> {
    return this.httpClient
      .jsonp(this.url, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
