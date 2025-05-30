import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ClrFormsModule, ClrIconModule} from '@clr/angular';
import {MemberService} from '../../../../../core/services/member.service';
import {
  MemberChildrenInfo,
  MemberDewInfo,
  MemberFamilyInfo,
  MemberFormValues,
  MemberReference
} from '../../../../../core/models/member.model';
import {editModeSubject} from '../../../../../core/subjects/members.subjects';
import {EnumResponseModel} from '../../../../../core/models/enum.model';

@Component({
  selector: 'app-family-info-member-details',
  imports: [CommonModule, ReactiveFormsModule, ClrFormsModule, ClrIconModule],
  templateUrl: './family-info-member-details.component.html',
  styleUrl: './family-info-member-details.component.scss'
})
export class FamilyInfoMemberDetailsComponent implements OnInit{

  private _memberService = inject(MemberService);

  familyInfoForm: FormGroup;
  isEditable: boolean = false;
  memberFormValues: MemberFormValues = {
    enums: new EnumResponseModel,
    zonePastors: [],
    preachingPoints: []
  }

  constructor(private fb: FormBuilder) {
    this.familyInfoForm = this.buildForm(new MemberFamilyInfo());
    this.setFormEditable();
  }

  buildForm(memberfamilyInfo: MemberFamilyInfo): FormGroup {
    const form = this.fb.group({ ...memberfamilyInfo });
    return form;
  }

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      this._memberService.dispatchMemberFamilyInfo(memberId);
    });

    this._memberService.fetchMemberFamilyInfo().subscribe(memberFamilyInfo => {
      this.familyInfoForm = this.buildForm(memberFamilyInfo);
      this.setFormEditable();
    });

    this._memberService.fetchMemberFormValues().subscribe(memberFormValues => {
      this.memberFormValues = memberFormValues;
    });

    this.familyInfoForm.disable();
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  setFormEditable() {
    if (this.isEditable) {
      this.familyInfoForm.enable();
    } else {
      this.familyInfoForm.disable();
    }
  }

  get childrenArray(): FormArray {
    return this.familyInfoForm.get('childrenDataList') as FormArray;
  }

  addChild(): void {
    this.childrenArray.push(this.createChildren());
  }

  removeChild(index: number): void {
    this.childrenArray.removeAt(index);
  }

  createChildren(child: MemberChildrenInfo = new MemberChildrenInfo()): FormGroup {
    return this.fb.group({
      childName: [child.childName || ''],
      childOccupation: [child.childOccupation || '']
    });
  }

  onSubmit() {

  }
}
