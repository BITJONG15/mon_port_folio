import {Routes} from '@angular/router';
import { HomePage } from './pages/home';
import { ProjectDetailPage } from './pages/project-detail';
import { AdminPage } from './pages/admin';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'project/:id', component: ProjectDetailPage },
  { path: 'admin', component: AdminPage },
  { path: '**', redirectTo: '' }
];
