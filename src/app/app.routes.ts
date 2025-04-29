import { Routes } from '@angular/router';
import { MembersComponent } from './shared/components/members/members.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
