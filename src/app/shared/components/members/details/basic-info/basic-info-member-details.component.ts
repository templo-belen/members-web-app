import { Component, inject, Input, OnInit } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { MemberBasicInfo } from '../../../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '../../../../../core/services/member.service';
import { toSignal } from '@angular/core/rxjs-interop';

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

  constructor(private fb: FormBuilder) {
    this.memberForm = this.buildForm(new MemberBasicInfo());
    this.setFormEditable();
  }

  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    const form = this.fb.group({
      ...memberBasicInfo,
      preachingPoint: this.fb.group(memberBasicInfo.preachingPoint!),
      zonePastor: this.fb.group(memberBasicInfo.zonePastor!),
    });
    return form;
  }

  ngOnInit(): void {
    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      this._memberService.dispatchMemberBasicInfo(memberId);
    });

    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      this.memberForm = this.buildForm(memberBasicInfo);
      this.setFormEditable();
    });
  }

  onFileSelected(event: any) {

  }

  onSubmit() {

  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;
    this.setFormEditable();
  }

  setFormEditable() {
    if (this.isEditable) {
      this.memberForm.enable();
    } else {
      this.memberForm.disable();
    }
  }
}
