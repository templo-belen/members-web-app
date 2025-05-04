import { Routes } from '@angular/router';
import { MembersComponent } from '../members/members.component';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { memberDetailsRoutes } from '../member-details/member-details.routes';

export const layoutRoutes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'members', component: MembersComponent },
  { path: 'member-details', component: MemberDetailsComponent, children: memberDetailsRoutes },
];
