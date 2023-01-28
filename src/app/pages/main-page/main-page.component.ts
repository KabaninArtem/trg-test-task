import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MapComponent } from '../../map/map.component';
import { PointLocation } from '../../models/api.models';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  providers: [
    MainPageService
  ],
  imports: [CommonModule, MapComponent]
})
export class MainPageComponent {
  locations$: Observable<PointLocation[]> = this.service.locations$;

  
  constructor(private service: MainPageService) {
  }
}
