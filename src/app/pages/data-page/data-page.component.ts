import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsTableComponent } from 'src/app/components/locations-table/locations-table.component';
import { PointLocation } from 'src/app/models/api.models';
import { ApiService } from 'src/app/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    LocationsTableComponent,
  ],
})
export class DataPageComponent {
  locations$: Observable<PointLocation[]> = this.service.locationsData$;

  constructor(private service: ApiService) {}
}
