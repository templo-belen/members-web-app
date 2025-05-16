import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ClrFormsModule, ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { MemberReferences, MemberReference } from '../../../../../core/models/member.model';
import { MemberService } from '../../../../../core/services/member.service';
import { editModeSubject } from '../../../../../core/subjects/members.subjects';

@Component({
  selector: 'app-references-member-details',
  imports: [FormsModule, ReactiveFormsModule, ClrFormsModule, ClrDatagridModule, ClrIconModule, CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
})
export class ReferencesMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  isEditable: boolean = false;
  memberForm: FormGroup;
  memberReferences: MemberReferences | null = null;

    constructor(private fb: FormBuilder) {
      this.memberForm = this.buildForm(new MemberReferences());
      this.setFormEditable();
    }

    ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });
    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
        this._memberService.dispatchMemberReferences(memberId);
    });
    
    this._memberService.fetchMemberReferences().subscribe(memberReferences => {
      this.memberForm = this.buildForm(memberReferences);
        this.setFormEditable();
    });
    this.memberForm.disable();
  }

 buildForm(memberReferences: MemberReferences): FormGroup {
    const referencesArray = this.fb.array(
      (memberReferences.references || []).map(ref => this.createReferenceGroup(ref))
    );

    return this.fb.group({
      id: [memberReferences.id || 0],
      references: referencesArray,
      reasonsForCongregating: [memberReferences.reasonsForCongregating || '']
    });
  }
  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      references: this.fb.array([]),
      reasonsForCongregating: ['']
    });
  }

  setFormEditable() {
    if (this.isEditable) {
      this.memberForm.enable();
    } else {
      this.memberForm.disable();
    }
  }
  get referencesArray(): FormArray {
    return this.memberForm.get('references') as FormArray;
  }

 toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  } 

 addReference(): void {
    this.referencesArray.push(this.createReferenceGroup());
  }

  removeReference(index: number): void {
    this.referencesArray.removeAt(index);
  }

  createReferenceGroup(reference: MemberReference = new MemberReference()): FormGroup {
    return this.fb.group({
      totalTime: [reference.totalTime || ''],
      churchName: [reference.churchName || ''],
      mainPastorName: [reference.mainPastorName || ''],
      leavingReason: [reference.leavingReason || '']
    });
  }
    onSubmit() {}
}