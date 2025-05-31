import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrWizardModule } from '@clr/angular';
import { DewInfoMemberDetailsComponent } from '../details/dew-info/dew-info-member-details.component';
import { ReferencesMemberDetailsComponent } from '../details/references/references-member-details.component';
import { GeneralInfoMemberDetailsComponent } from '../details/general-info/general-info-member-details.component';
import { FamilyInfoMemberDetailsComponent } from '../details/family-info/family-info-member-details.component';
import { BasicInfoMemberDetailsComponent } from '../details/basic-info/basic-info-member-details.component';
import { editModeSubject } from '../../../../core/subjects/members.subjects';
import { MemberService } from '../../../../core/services/member.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import {MemberBasicInfo} from '../../../../core/models/member.model';


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
export class NewMemberWizardComponent implements OnInit {

  private _memberService = inject(MemberService);

  @ViewChild('wizard') wizard: ClrWizard | undefined;
  @ViewChild('basicInfo') basicInfo: BasicInfoMemberDetailsComponent | undefined;
  @ViewChild('familyInfo') familyInfo: FamilyInfoMemberDetailsComponent | undefined;
  @ViewChild('generalInfo') generalInfo: GeneralInfoMemberDetailsComponent | undefined;
  @ViewChild('references') references: ReferencesMemberDetailsComponent | undefined;
  @ViewChild('dewInfo') dewInfo: DewInfoMemberDetailsComponent | undefined;

  @Input() wizardSize = 'full-screen';

  modelBasicInfo = new MemberBasicInfo();
  wizardOpen = false;
  confirmationOpen = false;

  ngOnInit() {
    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      if (memberBasicInfo.id > 0) {
        this.wizard?.forceNext();
      }
    });
  }

  open() {
    this._memberService.dispatchSelectedMemberId(0);
    editModeSubject.next(true);
    this.wizardOpen = true;
  }

  saveBasicInfo() {
    this.basicInfo?.onSubmit();
  }

  saveFamilyInfo() {
    // TODO: save family info
    // https://github.com/templo-belen/members-web-app/issues/61
  }

  saveGeneralInfo() {
    // TODO: save general info
    // https://github.com/templo-belen/members-web-app/issues/58
  }

  saveReferences() {
    // TODO: save references
    // https://github.com/templo-belen/members-web-app/issues/59
  }

  saveDewInfo() {
    // TODO: save DEW info
    // https://github.com/templo-belen/members-web-app/issues/60
  }

  onCancel() {
    this.confirmationOpen = true;
  }

  onCancelConfirmed() {
    this.wizard?.close();
    this.wizard?.reset();
    this.basicInfo?.form.reset();
    //this.familyInfo?.familyInfoForm.reset();
    this.generalInfo?.generalInfoForm.reset();
    this.references?.referencesForm.reset();
    this.dewInfo?.dewInfoForm.reset();
  }
}
