import { Routes } from '@angular/router';
import { BasicInfoMemberDetailsComponent } from './basic-info/basic-info-member-details.component';
import { FamilyInfoMemberDetailsComponent } from './family-info/family-info-member-details.component';
import { GeneralInfoMemberDetailsComponent } from './general-info/general-info-member-details.component';
import { ReferencesMemberDetailsComponent } from './references/references-member-details.component';
import { DewInfoMemberDetailsComponent } from './dew-info/dew-info-member-details.component';

export const memberDetailsRoutes: Routes = [
  { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
  { path: 'basic-info', component: BasicInfoMemberDetailsComponent },
  { path: 'family-info', component: FamilyInfoMemberDetailsComponent },
  { path: 'general-info', component: GeneralInfoMemberDetailsComponent },
  { path: 'references', component: ReferencesMemberDetailsComponent },
  { path: 'dew-info', component: DewInfoMemberDetailsComponent },
];
