import {Routes} from '@angular/router';
import {MembersComponent} from '../members/members.component';
import {memberDetailsRoutes} from '../members/details/member-details.routes';

export const layoutRoutes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  {
    path: 'members',
    component: MembersComponent,
    children: memberDetailsRoutes,
  },
];
