import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take } from 'rxjs/operators';
import { MAP_API_KEY, MAP_API_URL } from 'src/app/providers/map.providers';

@Injectable()
export class GoogleApiService {
  private url = `${this.mapApiUrl}?key=${this.mapApiKey}`;

  constructor(
    private httpClient: HttpClient,
    @Inject(MAP_API_URL) private mapApiUrl: string,
    @Inject(MAP_API_KEY) private mapApiKey: string
  ) {}

  private readySource = new BehaviorSubject<boolean>(false);

  ready$ = this.readySource.asObservable();

  init(): void {
    this.httpClient
      .jsonp(this.url, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
        take(1)
      )
      .subscribe((loaded) => {
        this.readySource.next(loaded);
      });
  }
}
