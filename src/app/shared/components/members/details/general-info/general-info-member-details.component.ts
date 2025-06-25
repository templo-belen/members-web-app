import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import { MemberService } from '../../../../../core/services/member.service';
import { MemberFormValues, MemberGeneralInfo } from '../../../../../core/models/member.model';
import { editModeSubject } from '../../../../../core/subjects/members.subjects';
import { EnumResponseModel } from '../../../../../core/models/enum.model';

@Component({
  selector: 'app-general-info-member-details',
  imports: [CommonModule, ReactiveFormsModule, ClrFormsModule],
  templateUrl: './general-info-member-details.component.html',
  styleUrl: './general-info-member-details.component.scss'
})
export class GeneralInfoMemberDetailsComponent {

  private _memberService = inject(MemberService);
  private _formBuilder = inject(FormBuilder);

  memberFormValues = this._memberService.selectMemberFormValues()
  generalInfoForm: FormGroup;
  isEditable: boolean = false;

  constructor(private fb: FormBuilder) {
    this.generalInfoForm = this.buildForm(new MemberGeneralInfo());
    this.setFormEditable();
  }

  buildForm(memberGeneralInfo: MemberGeneralInfo): FormGroup {
    return this.fb.group({ ...memberGeneralInfo });
  }

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchMemberGeneralInfo().subscribe(memberGeneralInfo => {
      this.generalInfoForm = this.buildForm(memberGeneralInfo);
      this.setFormEditable();
    });

  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  setFormEditable() {
    if (this.isEditable) {
      this.generalInfoForm.enable();
    } else {
      this.generalInfoForm.disable();
    }
  }

  onSubmit() {

  }
}
