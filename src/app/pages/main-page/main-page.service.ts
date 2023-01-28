import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointLocation } from '../../models/api.models';
import { ApiService } from '../../services/api.service';

@Injectable()
export class MainPageService {
  locations$: Observable<PointLocation[]> = this.apiService.getMarkers();

  
  constructor(private apiService: ApiService) {
  }
}
