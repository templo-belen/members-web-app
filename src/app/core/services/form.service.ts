import {Injectable} from '@angular/core';
import {DetailComponent} from '../../shared/components/members/details/detail.interface';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  public updateForm(detailComponent: DetailComponent) {
    if (detailComponent.getComponentModel()!) {
      detailComponent.getForm().patchValue({...detailComponent.getComponentModel()});
    }

    if (detailComponent.isEditable()) {
      detailComponent.getForm().enable();
    } else {
      detailComponent.getForm().disable();
    }
  }
}
