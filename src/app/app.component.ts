import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { GoogleApiService } from './services/google-api.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GoogleApiService],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HeaderComponent,
  ],
  standalone: true,
})
export class AppComponent {
  title = 'trg-test-task';

  constructor(private googleApiService: GoogleApiService) {
    this.googleApiService.init();
  }
}
