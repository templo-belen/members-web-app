import {Component, inject, OnInit} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {MemberBasicInfo} from '../../../../../core/models/member.model';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MemberService} from '../../../../../core/services/member.service';
import {editModeSubject} from '../../../../../core/subjects/members.subjects';

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
    this.memberForm = this.fb.group(MemberBasicInfo.empty());
    this.memberForm.addControl('file', new FormControl<FileList | null>(null));  //TODO evaluar si formara parte del modelo
    this.memberForm.disable();
  }

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      if (this.isEditable) {
        this.memberForm.enable();
      } else {
        this.memberForm.disable();
      }
    });

    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      this._memberService.dispatchMemberBasicInfo(memberId);
    });

    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      this.memberForm.patchValue(memberBasicInfo);
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
}
