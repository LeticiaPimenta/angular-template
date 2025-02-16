import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'job-performance', component: JobPerformanceComponent, data: { title: 'Job Performance' } },
    {
      path: 'calls',
      component: CallsComponent,
      data: { title: 'Calls' },
      children: [
        { path: 'details/:id', component: CallDetailsComponent, data: { title: 'Call Details' } }
      ]
    }
  ];
  