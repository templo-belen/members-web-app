import { Routes } from '@angular/router';
import { MembersComponent } from '../members/members.component';

export const layoutRoutes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'members', component: MembersComponent },
];
