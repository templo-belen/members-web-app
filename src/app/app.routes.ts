import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'members',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  },
  // Always keep at last route
  // TODO: define a 404 page
  // https://github.com/templo-belen/members-web-app/issues/63
  { path: '**', redirectTo: 'app', pathMatch: 'full' }
];
