import {Component, inject, OnInit} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {MemberBasicInfo, MemberFormValues} from '../../../../../core/models/member.model';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MemberService} from '../../../../../core/services/member.service';
import {editModeSubject} from '../../../../../core/subjects/members.subjects';
import {EnumResponseModel} from '../../../../../core/models/enum.model';

@Component({
  selector: 'app-basic-info-member-details',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info-member-details.component.html',
  styleUrl: './basic-info-member-details.component.scss',
})
export class BasicInfoMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  memberForm: FormGroup;
  isEditable: boolean = false;
  memberFormValues: MemberFormValues = {
    enums: new EnumResponseModel,
    zonePastors: [],
    preachingPoints: []
  }

  constructor(private fb: FormBuilder) {
    this.memberForm = this.buildForm(new MemberBasicInfo());
    this.setFormEditable();
  }

  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    return this.fb.group({
      ...memberBasicInfo,
      file: new FormControl<FileList | undefined>(undefined),  //TODO evaluar si formara parte del modelo
      preachingPoint: [memberBasicInfo.preachingPoint?.id!],
      zonePastor: [memberBasicInfo.zonePastor?.id!],

    });
  }

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      this._memberService.dispatchMemberBasicInfo(memberId);
    });

    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      this.memberForm = this.buildForm(memberBasicInfo);
      this.setFormEditable();
    });

    // Enums
    this._memberService.fetchMemberFormValues().subscribe(memberFormValues => {
      this.memberFormValues = memberFormValues;
    });

    this.memberForm.disable();
  }

  onFileSelected(event: any) {

  }

  onSubmit() {

  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  setFormEditable() {
    if (this.isEditable) {
      this.memberForm.enable();
    } else {
      this.memberForm.disable();
    }
  }
}
