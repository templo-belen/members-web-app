import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule, ClrIconModule } from '@clr/angular';
import { MemberReference, MemberReferences, } from '../../../../../core/models/member.model';
import { MemberService } from '../../../../../core/services/member.service';
import { editModeSubject } from '../../../../../core/subjects/members.subjects';

@Component({
  selector: 'app-references-member-details',
  standalone: true,
  imports: [ReactiveFormsModule, ClrFormsModule, ClrIconModule, CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
})
export class ReferencesMemberDetailsComponent implements OnInit {
  private _memberService = inject(MemberService);
  private _fb = inject(FormBuilder);

  isEditable = false;
  referencesForm: FormGroup;

  constructor() {
    this.referencesForm = this.buildForm(new MemberReferences());
    this.setFormEditable();
  }

  ngOnInit(): void {
    editModeSubject.subscribe((mode) => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchMemberReferences().subscribe((memberReferences) => {
      this.referencesForm = this.buildForm(memberReferences);
      this.setFormEditable();
    });

    this.referencesForm.disable();
  }

  buildForm(memberReferences: MemberReferences): FormGroup {
    const referencesArray = this._fb.array(
      (memberReferences.references || []).map((ref) =>
        this.createReferenceGroup(ref)
      )
    );

    return this._fb.group({
      references: referencesArray,
      reasonsForCongregating: [memberReferences.reasonsForCongregating || ''],
    });
  }

  createForm(): FormGroup {
    return this._fb.group({
      references: this._fb.array([]),
      reasonsForCongregating: [''],
    });
  }

  setFormEditable(): void {
    if (this.isEditable) {
      this.referencesForm.enable();
    } else {
      this.referencesForm.disable();
    }
  }

  toggleEditMode(): void {
    editModeSubject.next(!this.isEditable);
  }

  get referencesArray(): FormArray {
    return this.referencesForm.get('references') as FormArray;
  }

  addReference(): void {
    this.referencesArray.push(this.createReferenceGroup());
  }

  removeReference(index: number): void {
    this.referencesArray.removeAt(index);
  }

  createReferenceGroup(reference: MemberReference = new MemberReference()): FormGroup {
    return this._fb.group({
      totalTime: [reference.totalTime || ''],
      churchName: [reference.churchName || ''],
      mainPastorName: [reference.mainPastorName || ''],
      leavingReason: [reference.leavingReason || ''],
    });
  }

  onSubmit() {
    // TODO
  }
}
