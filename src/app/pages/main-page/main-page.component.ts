import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PointLocation } from '../../models/api.models';
import { MainPageService } from './main-page.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { LocationDetailsComponent } from 'src/app/components/location-details/location-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainPageService],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    LocationDetailsComponent,
    MapComponent,
  ],
})
export class MainPageComponent {
  @ViewChild(MatDrawer, { static: true }) drawer: MatDrawer;

  locations$: Observable<PointLocation[]> = this.service.locations$;
  googleApiLoaded$: Observable<boolean> = this.service.googleApiLoaded$;
  details: PointLocation | null = null;

  constructor(
    private service: MainPageService,
    private cdr: ChangeDetectorRef
  ) {}

  onDetailsToggle(value: PointLocation | null): void {
    this.details = value;

    if (value) {
      this.drawer.open();
    } else {
      this.closeDetails();
    }

    this.cdr.detectChanges();
  }

  closeDetails(): void {
    this.drawer.close();
  }
}
