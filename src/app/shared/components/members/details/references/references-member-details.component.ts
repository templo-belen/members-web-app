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
export class ReferencesMemberDetailsComponent {
  isEditable: boolean = false;

  setEditMode(mode: boolean) {
    this.isEditable = mode;
    if (mode) {
      // TODO activate form
    } else {

    }
  }
}
