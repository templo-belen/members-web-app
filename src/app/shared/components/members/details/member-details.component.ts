import {Component, inject, effect, input, output} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClrVerticalNavModule} from '@clr/angular';
import {CommonModule} from '@angular/common';
import {MemberService} from '../../../../core/services/member.service';
import {BasicInfoMemberDetailsComponent} from './basic-info/basic-info-member-details.component';
import {FamilyInfoMemberDetailsComponent} from './family-info/family-info-member-details.component';
import {GeneralInfoMemberDetailsComponent} from './general-info/general-info-member-details.component';
import {ReferencesMemberDetailsComponent} from './references/references-member-details.component';
import {DewInfoMemberDetailsComponent} from './dew-info/dew-info-member-details.component';
import {Member, MemberBasicInfo} from '../../../../core/models/member.model';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule, CommonModule, BasicInfoMemberDetailsComponent, FamilyInfoMemberDetailsComponent, GeneralInfoMemberDetailsComponent, ReferencesMemberDetailsComponent, DewInfoMemberDetailsComponent],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent {
  private _memberService = inject(MemberService);

  member = output<Member>();
  currentMember = new Member();
  selectedMember = this._memberService.fetchCurrentMember();
  operation = input.required<string>();
  isEditable = input.required<boolean>();
  selected = input<string>();

  constructor() {
    effect(() => {
        if (this.operation() === 'PUT') {
          this._update();
        }
    });
  }

  public setBasicInfo(input: MemberBasicInfo) {
    this.currentMember.memberBasicInfo = input;
  }

  private _update() {
    switch (this.selected()) {
      case 'basicInfo':

        break;
    }
  }
}
