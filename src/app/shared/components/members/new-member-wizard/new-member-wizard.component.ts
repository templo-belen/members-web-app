import { Component, inject, Input, ViewChild } from '@angular/core';
import { ClrWizard, ClrWizardModule } from '@clr/angular';
import { DewInfoMemberDetailsComponent } from '../details/dew-info/dew-info-member-details.component';
import { ReferencesMemberDetailsComponent } from '../details/references/references-member-details.component';
import { GeneralInfoMemberDetailsComponent } from '../details/general-info/general-info-member-details.component';
import { FamilyInfoMemberDetailsComponent } from '../details/family-info/family-info-member-details.component';
import { BasicInfoMemberDetailsComponent } from '../details/basic-info/basic-info-member-details.component';
import { editModeSubject } from '../../../../core/subjects/members.subjects';
import { MemberService } from '../../../../core/services/member.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-new-member-wizard',
  imports: [
    ClrWizardModule,
    BasicInfoMemberDetailsComponent,
    FamilyInfoMemberDetailsComponent,
    GeneralInfoMemberDetailsComponent,
    ReferencesMemberDetailsComponent,
    DewInfoMemberDetailsComponent,
    ConfirmationDialogComponent,
  ],
  templateUrl: './new-member-wizard.component.html',
  styleUrl: './new-member-wizard.component.scss'
})
export class NewMemberWizardComponent {

  private _memberService = inject(MemberService);

  @ViewChild('wizard') wizard: ClrWizard | undefined;
  @ViewChild('basicInfo') basicInfo: BasicInfoMemberDetailsComponent | undefined;
  @ViewChild('familyInfo') familyInfo: FamilyInfoMemberDetailsComponent | undefined;
  @ViewChild('generalInfo') generalInfo: GeneralInfoMemberDetailsComponent | undefined;
  @ViewChild('references') references: ReferencesMemberDetailsComponent | undefined;
  @ViewChild('dewInfo') dewInfo: DewInfoMemberDetailsComponent | undefined;

  @Input() wizardSize = 'full-screen';

  wizardOpen = false;
  confirmationOpen = false;

  open() {
    this._memberService.dispatchSelectedMemberId(0);
    editModeSubject.next(true);
    this.wizardOpen = true;
  }

  saveBasicInfo() {
    // TODO: save basic info
    // https://github.com/templo-belen/members-web-app/issues/49
  }

  saveFamilyInfo() {
    // TODO: save family info
    // https://github.com/templo-belen/members-web-app/issues/49
  }

  saveGeneralInfo() {
    // TODO: save general info
    // https://github.com/templo-belen/members-web-app/issues/49
  }

  saveReferences() {
    // TODO: save references
    // https://github.com/templo-belen/members-web-app/issues/49
  }

  saveDewInfo() {
    // TODO: save DEW info
    // https://github.com/templo-belen/members-web-app/issues/49
  }

  onCancel() {
    this.confirmationOpen = true;
  }

  onCancelConfirmed() {
    this.wizard?.close();
    this.wizard?.reset();
    this.basicInfo?.basicInfoForm.reset();
    //this.familyInfo?.familyInfoForm.reset();
    this.generalInfo?.generalInfoForm.reset();
    this.references?.referencesForm.reset();
    this.dewInfo?.dewInfoForm.reset();
  }
}
