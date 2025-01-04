import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./search-page/search-page.component') },
  { path: 'user/:profile', loadComponent: () => import('./user-page/user-page.component') }
];
