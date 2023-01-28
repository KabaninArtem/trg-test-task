import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LatLngPipe } from '../pipes/lat-lng.pipe';
import { PointLocation } from '../models/api.models';
import { MapService } from './map.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_API_URL } from '../map-configs/map.providers';
import { MAP_API_KEY, MAP_API_URL } from '../providers/map.providers';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    MapService,
    { provide: MAP_API_URL, useValue: GOOGLE_MAP_API_URL },
    { provide: MAP_API_KEY, useValue: GOOGLE_MAP_API_KEY },
  ],
  imports: [
    CommonModule, 
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LatLngPipe
  ]
})
export class MapComponent {
  @Input() locations: PointLocation[] | null = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 32, lng: 32 };
  @Input() zoom: number = 4;


  apiLoaded$: Observable<boolean> = this.service.load();

  constructor(private service: MapService) {
  }
}
