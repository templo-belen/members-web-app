import { Component } from '@angular/core';

@Component({
  selector: 'app-dew-info-member-details',
  imports: [],
  templateUrl: './dew-info-member-details.component.html',
  styleUrl: './dew-info-member-details.component.scss'
})
export class DewInfoMemberDetailsComponent {

  isEditable: boolean = false;

  setEditMode(mode: boolean) {
    this.isEditable = mode;
    if (mode) {
      // TODO activate form
    } else {

    }
  }

}
