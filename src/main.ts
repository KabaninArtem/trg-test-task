import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/models/app.routes';
import { ApiService } from './app/services/api.service';

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
    { provide: ApiService, useClass: ApiService },
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
