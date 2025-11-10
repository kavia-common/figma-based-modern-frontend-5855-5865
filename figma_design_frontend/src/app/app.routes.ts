import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { WireframeComponent } from './pages/wireframe/wireframe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home • OceanPro' },
  { path: 'about', component: AboutComponent, title: 'About • OceanPro' },
  { path: 'login', component: LoginComponent, title: 'Login • OceanPro' },
  { path: 'wireframe', component: WireframeComponent, title: 'Wireframe • OceanPro' },
  // 404 fallback as a component so route remains visible and user gets context
  { path: '404', component: NotFoundComponent, title: 'Not Found • OceanPro' },
  { path: '**', redirectTo: '404' },
];
