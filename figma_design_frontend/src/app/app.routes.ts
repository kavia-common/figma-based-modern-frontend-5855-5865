import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home • OceanPro' },
  { path: 'about', component: AboutComponent, title: 'About • OceanPro' },
  { path: 'login', component: LoginComponent, title: 'Login • OceanPro' },
  { path: '**', redirectTo: '' },
];
