import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PointLocation } from '../../models/api.models';
import { MainPageService } from './main-page.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { LocationDetailsComponent } from 'src/app/components/location-details/location-details.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  providers: [MainPageService],
  imports: [
    CommonModule,
    MatSidenavModule,
    LocationDetailsComponent,
    MapComponent,
  ],
})
export class MainPageComponent {
  @ViewChild(MatDrawer, { static: true }) drawer: MatDrawer | undefined;

  locations$: Observable<PointLocation[]> = this.service.locations$;
  details: PointLocation | null = null;

  constructor(private service: MainPageService) {}

  onDetailsToggle(value: PointLocation | null): void {
    this.details = value;

    if (value) {
      this.drawer!.open();
    } else {
      this.drawer!.close();
    }
  }
}
