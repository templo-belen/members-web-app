import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ClrFormsModule, ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { MemberReference, References } from '../../../../../core/models/member-reference-model';
import { MemberService } from '../../../../../core/services/member.service';

@Component({
  selector: 'app-references-member-details',
  imports: [FormsModule, ReactiveFormsModule, ClrFormsModule, ClrDatagridModule, ClrIconModule, CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
})
export class ReferencesMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  memberForm: FormGroup;
  isEditable: boolean = false;
  memberReferences: MemberReference | null = null;

  constructor(private fb: FormBuilder) {
    this.memberForm = this.fb.group(MemberReference.empty());
    this.memberForm.disable();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      references: this.fb.array([]),
      reasonsForCongregating: ['']
    });
  }

  ngOnInit(): void {
    this._memberService.fetchSelectedMemberId().subscribe(memberId => {
        this._memberService.dispatchMemberReferences(memberId);
    });
    
    this._memberService.fetchMemberReferences().subscribe(memberReferences => {
      this.memberForm.patchValue(memberReferences);
        this.updateForm(memberReferences);
    });
  }
  
  onSubmit() {
    // TODO: save member references
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.memberForm.enable();
    } else {
      this.memberForm.disable();
    }
  }

  get referencesArray(): FormArray {
    return this.memberForm.get('references') as FormArray;
  }

  addReference() {
    this.referencesArray.push(this.createReferenceGroup(References.empty()));
  }

  removeReference(index: number) {
    this.referencesArray.removeAt(index);
  }

  createReferenceGroup(reference: References): FormGroup {
    return this.fb.group({
      totalTime: [reference.totalTime],
      churchName: [reference.churchName],
      mainPastorName: [reference.mainPastorName],
      leavingReason: [reference.leavingReason]
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
}