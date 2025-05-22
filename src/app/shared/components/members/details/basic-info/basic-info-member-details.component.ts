import {Component, inject, OnInit} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {MemberBasicInfo} from '../../../../../core/models/member.model';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MemberService} from '../../../../../core/services/member.service';
import {editModeSubject} from '../../../../../core/subjects/members.subjects';
import {EnumService} from '../../../../../core/services/enum.service';
import {EnumResponseModel} from '../../../../../core/models/enum.model';

@Component({
  selector: 'app-basic-info-member-details',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info-member-details.component.html',
  styleUrl: './basic-info-member-details.component.scss',
})
export class BasicInfoMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);
  private _enumService = inject(EnumService);

  basicInfoForm: FormGroup;
  isEditable: boolean = false;
  memberEnums: EnumResponseModel = {}

  constructor(private fb: FormBuilder) {
    this.basicInfoForm = this.buildForm(new MemberBasicInfo());
    this.setFormEditable();
  }

  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    return this.fb.group({
      ...memberBasicInfo,
      preachingPoint: this.fb.group(memberBasicInfo.preachingPoint!),
      zonePastor: this.fb.group(memberBasicInfo.zonePastor!),
      file: new FormControl<FileList | undefined>(undefined),  //TODO evaluar si formara parte del modelo
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
      this.basicInfoForm = this.buildForm(memberBasicInfo);
      this.setFormEditable();
    });

    // Enums
    this._enumService.fetchEnumMap().subscribe(enumMap => {
      this.memberEnums = enumMap;
    });

    this.basicInfoForm.disable();
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
      this.basicInfoForm.enable();
    } else {
      this.basicInfoForm.disable();
    }
  }
}
