import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'suites', loadComponent: () => import('./suites/suites.component').then(m => m.SuitesComponent) },
  { path: 'config', loadComponent: () => import('./config/config.component').then(m => m.ConfigComponent) },
  { path: 'execution', loadComponent: () => import('./execution/execution.component').then(m => m.ExecutionComponent) },
  { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: '**', redirectTo: '' }
];
