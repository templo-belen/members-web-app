import {Component, inject, input, OnInit, output} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClrVerticalNavModule} from '@clr/angular';
import {editModeSubject} from '../../../../core/subjects/members.subjects';
import {CommonModule} from '@angular/common';
import {MemberService} from '../../../../core/services/member.service';
import {BasicInfoMemberDetailsComponent} from './basic-info/basic-info-member-details.component';
import {FamilyInfoMemberDetailsComponent} from './family-info/family-info-member-details.component';
import {GeneralInfoMemberDetailsComponent} from './general-info/general-info-member-details.component';
import {ReferencesMemberDetailsComponent} from './references/references-member-details.component';
import {DewInfoMemberDetailsComponent} from './dew-info/dew-info-member-details.component';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule, CommonModule, BasicInfoMemberDetailsComponent, FamilyInfoMemberDetailsComponent, GeneralInfoMemberDetailsComponent, ReferencesMemberDetailsComponent, DewInfoMemberDetailsComponent],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent implements OnInit {
  closeModal = output<void>();
  memberId = input.required<number>();
  memberName = input.required<string>();


  isEditable = false;
  selected = "basicInfo";
  currentTabTitle = 'Datos Personales';

  private _memberService = inject(MemberService);

  constructor() {
    editModeSubject.subscribe(mode => this.isEditable = mode);
  }

  ngOnInit(): void {
    this._memberService.dispatchMemberFormValues();
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  handleClose() {
    this.closeModal.emit();
    this.currentTabTitle = 'Datos Personales';
    editModeSubject.next(false);
  }

  select(option: string) {
    this.selected = option;
  }
}
