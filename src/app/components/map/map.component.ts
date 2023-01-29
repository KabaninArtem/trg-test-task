import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { LatLngPipe } from 'src/app/pipes/lat-lng.pipe';
import { GoogleMap } from '@angular/google-maps';
import { PointLocation } from 'src/app/models/api.models';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, LatLngPipe],
})
export class MapComponent {
  @Input() locations: PointLocation[] = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 32, lng: 32 };
  @Input() zoom: number = 4;

  @Output() toggleDetails: EventEmitter<PointLocation | null> =
    new EventEmitter();

  @ViewChild(GoogleMap) map: GoogleMap;

  infoWindow = new google.maps.InfoWindow();
  markerCluster: MarkerClusterer;

  ngAfterViewInit(): void {
    this.createMarkerCluster();
    this.addInfoWindowCloseListener();
  }

  private openInfo(marker: google.maps.Marker, info: PointLocation): void {
    this.closeInfo();

    this.infoWindow.setContent(
      `<span class="map-info-window"><strong>${info.name}</strong></span>`
    );
    this.infoWindow.open(this.map.googleMap, marker);
    this.toggleDetails.emit(info);
  }

  closeInfo(): void {
    this.infoWindow.close();
    this.toggleDetails.emit(null);
  }

  private createMarkerCluster(): void {
    this.markerCluster = new MarkerClusterer({
      map: this.map.googleMap!,
      markers: this.createMarkers(this.locations),
    });
  }

  private addInfoWindowCloseListener() {
    google.maps.event.addListener(this.infoWindow, 'closeclick', () =>
      this.closeInfo()
    );
  }

  private createMarkers(value: PointLocation[]): google.maps.Marker[] {
    return value.map((info) => {
      const [lat, lng] = info.coordinates;
      const position = { lat: lat!, lng: lng! };
      const marker = new google.maps.Marker({ position });

      google.maps.event.addListener(marker, 'click', () =>
        this.openInfo(marker, info)
      );

      return marker;
    });
  }
}
