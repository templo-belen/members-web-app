import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ClrFormsModule, ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { MemberReference, references } from '../../../../../core/models/member-reference-model';
import { MemberService } from '../../../../../core/services/member.service';

@Component({
  selector: 'app-references-member-details',
  imports: [FormsModule, ReactiveFormsModule, ClrFormsModule, ClrDatagridModule, ClrIconModule, CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class ReferencesMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  memberForm: FormGroup;
  isEditable: boolean = false;
  memberReferences: MemberReference | null = null;

  constructor(private fb: FormBuilder) {
    this.memberForm = this.createForm();
    this.memberForm.disable();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      references: this.fb.array([]),
      reasonsForCongregating: ['']
    });
  }

  get referencesArray(): FormArray {
    return this.memberForm.get('references') as FormArray;
  }

  createReferenceGroup(reference: references): FormGroup {
    return this.fb.group({
      totalTime: [reference.totalTime],
      churchName: [reference.churchName],
      mainPastorName: [reference.mainPastorName],
      leavingReason: [reference.leavingReason]
    });
  }

  ngOnInit(): void {
    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
      if (memberId) {
        this._memberService.dispatchMemberReferences(memberId);
      }
    });
    
    this._memberService.fetchMemberReferences().subscribe(memberReferences => {
      if (memberReferences) {
        this.memberReferences = memberReferences;
        this.updateForm(memberReferences);
      }
    });
  }

  updateForm(data: MemberReference): void {
    this.memberForm = this.createForm();
    this.memberForm.disable();
    
    this.memberForm.patchValue({
      id: data.id,
      reasonsForCongregating: data.reasonsForCongregating
    });

    if (data.references && data.references.length > 0) {
      data.references.forEach(reference => {
        (this.memberForm.get('references') as FormArray).push(this.createReferenceGroup(reference));
      });
    }

    if (this.isEditable) {
      this.memberForm.enable();
    }
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

  addReference() {
    this.referencesArray.push(this.createReferenceGroup(references.empty()));
  }

  removeReference(index: number) {
    this.referencesArray.removeAt(index);
  }
}