import { Component } from '@angular/core';

@Component({
  selector: 'app-family-info-member-details',
  imports: [],
  templateUrl: './family-info-member-details.component.html',
  styleUrl: './family-info-member-details.component.scss'
})
export class FamilyInfoMemberDetailsComponent {
  isEditable: boolean = false;

  setEditMode(mode: boolean) {
    this.isEditable = mode;
    if (mode) {
      // TODO activate form
    } else {

    }
  }
}
