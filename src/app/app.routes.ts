import { Routes } from '@angular/router';
import { RegisterEventComponent } from './components/register-event/register-event.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registra-evento',
    component: RegisterEventComponent,
  },
];
