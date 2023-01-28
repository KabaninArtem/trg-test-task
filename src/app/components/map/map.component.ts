import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MapService } from './map.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MAP_API_KEY, MAP_API_URL } from 'src/app/providers/map.providers';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_API_URL } from 'src/app/configs/map-configs/map.providers';
import { LatLngPipe } from 'src/app/pipes/lat-lng.pipe';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PointLocation } from 'src/app/models/api.models';

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

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;


  apiLoaded$: Observable<boolean> = this.service.load();
  detailsContent: string = '';

  constructor(private service: MapService) {
  }

  showDetails(marker: MapMarker, details: string): void {
    if (this.infoWindow) {
      this.detailsContent = details;
      this.infoWindow.open(marker);
    }
  }
}
