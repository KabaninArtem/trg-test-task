import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import locations from '../mocks/locations.json';
import { PointLocation } from '../models/api.models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiService {
  private locationsDataSource: BehaviorSubject<PointLocation[]> =
    new BehaviorSubject(locations as PointLocation[]);

  locationsData$: Observable<PointLocation[]> =
    this.locationsDataSource.asObservable();

  constructor() {}

  insertMarker(value: PointLocation): void {
    this.locationsData = [...this.locationsData, value];
  }

  private get locationsData(): PointLocation[] {
    return this.locationsDataSource.value;
  }

  private set locationsData(value: PointLocation[]) {
    this.locationsDataSource.next(value);
  }
}
