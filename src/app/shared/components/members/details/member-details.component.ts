import { Component, computed, inject, input, OnInit, output} from '@angular/core';
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
export class MemberDetailsComponent implements OnInit {
  private _memberService = inject(MemberService);

  member = output<Member>();
  operation = input.required<string>();
  isEditable = input.required<boolean>();
  selected = input<string>();
  memberId = this._memberService.selectedMemberId();
  basicInfo = computed(() => this._buildBasicInfo());

  ngOnInit(): void {
    this._memberService.dispatchMemberFormValues();

    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      this._memberService.dispatchMember(memberId);
    });

  }

  private _buildBasicInfo(): MemberBasicInfo {
    if (this.operation()  === 'CREATE') {
      return new MemberBasicInfo();
    }
    const selectedBasicInfo = this._memberService.selectMemberBasicInfo();
    return selectedBasicInfo();
  }

  protected readonly MemberBasicInfo = MemberBasicInfo;
}
