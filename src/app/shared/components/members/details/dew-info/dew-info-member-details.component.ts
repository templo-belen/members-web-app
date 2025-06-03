import { CommonModule } from '@angular/common';
import { ClrFormsModule } from '@clr/angular';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MemberService } from '../../../../../core/services/member.service';
import { MemberDewInfo } from '../../../../../core/models/member.model';
import { editModeSubject } from '../../../../../core/subjects/members.subjects';

@Component({
  selector: 'app-dew-info-member-details',
  imports: [CommonModule, ReactiveFormsModule, ClrFormsModule],
  templateUrl: './dew-info-member-details.component.html',
  styleUrl: './dew-info-member-details.component.scss'
})
export class DewInfoMemberDetailsComponent {

  private _memberService = inject(MemberService);

  dewInfoForm: FormGroup;
  isEditable: boolean = false;

  constructor(private fb: FormBuilder) {
    this.dewInfoForm = this.buildForm(new MemberDewInfo());
    this.setFormEditable();
  }

  buildForm(memberDewInfo: MemberDewInfo): FormGroup {
    const form = this.fb.group({ ...memberDewInfo });
    return form;
  }

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchMemberDewInfo().subscribe(memberDewInfo => {
      this.dewInfoForm = this.buildForm(memberDewInfo);
      this.setFormEditable();
    });
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  setFormEditable() {
    if (this.isEditable) {
      this.dewInfoForm.enable();
    } else {
      this.dewInfoForm.disable();
    }
  }

  onSubmit() {

  }
}
