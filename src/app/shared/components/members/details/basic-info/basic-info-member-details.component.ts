import { Component, inject, Input, OnInit } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { MemberBasicInfo } from '../../../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '../../../../../core/services/member.service';

@Component({
  selector: 'app-basic-info-member-details',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info-member-details.component.html',
  styleUrl: './basic-info-member-details.component.scss',
})
export class BasicInfoMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  @Input()
  memberId = 1;

  memberForm: FormGroup;
  isEditable: boolean = false;

  constructor(private fb: FormBuilder) {
    this.memberForm = this.fb.group(MemberBasicInfo.empty());
    this.memberForm.disable();
    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      this.memberForm.patchValue(memberBasicInfo);
    });
  }

  ngOnInit(): void {
    this._memberService.dispatchMemberBasicInfo(this.memberId);
  }

  onFileSelected(event: any) {

  }

  onSubmit() {

  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.memberForm.enable();
    } else {
      this.memberForm.disable();
    }
  }
}
