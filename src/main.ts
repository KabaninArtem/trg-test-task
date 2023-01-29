import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import {
  GOOGLE_MAP_API_KEY,
  GOOGLE_MAP_API_URL,
} from './app/configs/map-configs/map.providers';
import { AppRoutes } from './app/models/app.routes';
import { MAP_API_KEY, MAP_API_URL } from './app/providers/map.providers';
import { windowProvider, WindowToken } from './app/providers/window.provider';
import { ApiService } from './app/services/api.service';
import { GoogleApiService } from './app/services/google-api.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.MAIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.MAIN,
    loadComponent: () =>
      import('./app/pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
  },
  {
    path: AppRoutes.DATA,
    loadComponent: () =>
      import('./app/pages/data-page/data-page.component').then(
        (m) => m.DataPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: AppRoutes.MAIN,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    { provide: MAP_API_URL, useValue: GOOGLE_MAP_API_URL },
    { provide: MAP_API_KEY, useValue: GOOGLE_MAP_API_KEY },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: WindowToken, useFactory: windowProvider },
    { provide: ApiService, useClass: ApiService },
    { provide: GoogleApiService, useClass: GoogleApiService },
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
