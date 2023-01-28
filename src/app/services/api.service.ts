import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import locations from '../mocks/locations.json'
import { PointLocation } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private locationsData: PointLocation[] = locations as PointLocation[];

  constructor() { }

  getMarkers(): Observable<PointLocation[]> {
    return of(this.locationsData);
  }
}
