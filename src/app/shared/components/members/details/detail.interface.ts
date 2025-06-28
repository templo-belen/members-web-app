import {FormGroup} from '@angular/forms';

export interface DetailComponent {
  isEditable(): boolean;
  getForm(): FormGroup;
  getComponentModel(): ComponentModel;
}

export interface ComponentModel {
 //TODO
}
