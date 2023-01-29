import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PointLocation } from 'src/app/models/api.models';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
})
export class LocationDetailsComponent {
  @Input() data: PointLocation | null;
}
