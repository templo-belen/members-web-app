import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule, ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { ChurchReference } from '../../../../../core/models/church-reference-model';

@Component({
  selector: 'app-references-member-details',
  imports: [     
    FormsModule,
    ReactiveFormsModule,
    ClrFormsModule,
    ClrDatagridModule,
    ClrIconModule,
    CommonModule],
  templateUrl: './references-member-details.component.html',
  styleUrl: './references-member-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true

})
export class ReferencesMemberDetailsComponent implements OnInit {

  churchReferences: ChurchReference[] = [];

  //TODO: mover a un form group 
  reasonsForJoining = new FormControl('');
  createdOn = new FormControl('');
  createdBy = new FormControl('');
  modifiedOn = new FormControl('');
  modifiedBy = new FormControl('');

  ngOnInit(): void {
    this.addReference();
  }

  addReference(): void {
    this.churchReferences.push({
      time: '',
      churchName: '',
      leadPastorName: '',
      reasonForLeaving: ''
    });
  }

  removeReference(index: number): void {
    if (this.churchReferences.length > 1) {
      this.churchReferences.splice(index, 1);
    }
  }

  onSubmit(): void {
    const formData = {

    };  
  }
}
