import { Routes } from '@angular/router';
import { MembersComponent } from './shared/components/members/members.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      // TODO: ajustar optiones del menú
      { path: 'members', component: MembersComponent },
      { path: 'member-details', component: MembersComponent },
      { path: '', redirectTo: 'member-details', pathMatch: 'full' }
    ]
  },
];
