import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { LocationsTableComponent } from 'src/app/components/locations-table/locations-table.component';
import { PointLocation } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  LocationDataDialogConfig,
  LocationDialogComponent,
} from 'src/app/components/location-dialog/location-dialog.component';
import { EMPTY_POINT_LOCATION } from 'src/app/configs/location.config';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LocationsTableComponent,
  ],
})
export class DataPageComponent implements OnDestroy {
  locations$: Observable<PointLocation[]> = this.service.locationsData$;

  private dialogRef: MatDialogRef<
    LocationDialogComponent,
    PointLocation
  > | null = null;

  constructor(private service: ApiService, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  openAddLocationDialog(): void {
    this.dialogRef = this.dialog.open<
      LocationDialogComponent,
      LocationDataDialogConfig,
      PointLocation
    >(LocationDialogComponent, {
      data: {
        ...EMPTY_POINT_LOCATION,
        reservedNames: this.service.locationNames,
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.service.insertMarker(result);
          this.dialogRef = null;
        }
      });
  }

  openEditLocationDialog(value: PointLocation): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      data: {
        ...value,
        reservedNames: this.service.locationNames,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.service.updateMarker(value.name, result);
          this.dialogRef = null;
        }
      });
  }
}
