import { Pipe, PipeTransform } from '@angular/core';
import { Coordinates } from '../models/api.models';

@Pipe({
  name: 'latLng',
  pure: true,
  standalone: true,
})
export class LatLngPipe implements PipeTransform {
  transform(
    [lat, lng]: Coordinates,
    ...args: unknown[]
  ): google.maps.LatLngLiteral {
    return { lat: lat!, lng: lng! };
  }
}
