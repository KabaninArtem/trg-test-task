import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import locations from '../mocks/locations.json';
import { PointLocation } from '../models/api.models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiService {
  private locationsDataSource: BehaviorSubject<PointLocation[]> =
    new BehaviorSubject(locations as PointLocation[]);

  private readonly nameIndexMap: Record<string, number> = {};

  locationsData$: Observable<PointLocation[]> =
    this.locationsDataSource.asObservable();

  constructor() {
    this.createNameIndexMap();
  }

  get locationNames(): string[] {
    return this.locationsData.map(({ name }) => name);
  }

  insertMarker(value: PointLocation): void {
    this.locationsData = [...this.locationsData, value];
    this.nameIndexMap[value.name] = this.locationsData.length - 1;
  }

  updateMarker(originalName: string, value: PointLocation): void {
    const idx = this.getMarkerIndex(originalName);

    if (idx !== -1) {
      this.replaceMarker(idx, value);
      this.replaceNameIndex(idx, originalName, value);
    }
  }

  private replaceNameIndex(
    index: number,
    originalName: string,
    value: PointLocation
  ): void {
    if (originalName !== value.name) {
      delete this.nameIndexMap[originalName];

      this.nameIndexMap[value.name] = index;
    }
  }

  private replaceMarker(index: number, value: PointLocation): void {
    const result = [...this.locationsData];

    result[index] = value;
    this.locationsData = result;
  }

  private getMarkerIndex(name: string): number {
    const result = this.nameIndexMap[name];

    return typeof result === 'number' ? result : -1;
  }

  private createNameIndexMap(): void {
    this.locationsData.forEach(
      ({ name }, index) => (this.nameIndexMap[name] = index)
    );
  }

  private get locationsData(): PointLocation[] {
    return this.locationsDataSource.value;
  }

  private set locationsData(value: PointLocation[]) {
    this.locationsDataSource.next(value);
  }
}
