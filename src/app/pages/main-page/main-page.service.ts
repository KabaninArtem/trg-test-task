import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { PointLocation } from '../../models/api.models';
import { ApiService } from '../../services/api.service';

@Injectable()
export class MainPageService {
  locations$: Observable<PointLocation[]> = this.apiService.locationsData$;
  googleApiLoaded$: Observable<boolean> = this.googleApiService.ready$;

  constructor(
    private apiService: ApiService,
    private googleApiService: GoogleApiService
  ) {}
}
