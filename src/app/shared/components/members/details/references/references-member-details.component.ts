import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
@Component({
  selector: 'app-references-member-details',
  imports: [ FormsModule, ReactiveFormsModule, ClrFormsModule, CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true

})
export class ReferencesMemberDetailsComponent implements OnInit {
  //TODO: mover a un form group 
  time = new FormControl('');
  churchName = new FormControl('');
  leadPastorName = new FormControl('');
  reasonForLeaving = new FormControl('');
  reasonsForJoining = new FormControl('');
  createdOn = new FormControl('');
  createdBy = new FormControl('');
  modifiedOn = new FormControl('');
  modifiedBy = new FormControl('');

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formData = {
    };    
  }
}
