import {Component, Input} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {ClrVerticalNavModule} from '@clr/angular';
import {filter, Subject} from 'rxjs';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent {
  @Input({ required: true }) closeModal!: () => void;
  @Input({ required: true }) memberName!: string;
  @Input({ required: true }) memberId!: number;

  isEditable = false;
  editModeSubject = new Subject<boolean>();
  currentTabComponent: any;

  currentTabTitle = 'Datos Personales';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTabTitle(this.router.url);
    });
  }

  updateTabTitle(url: string) {
    if (url.includes('basic-info')) this.currentTabTitle = 'Datos Personales';
    else if (url.includes('family-info')) this.currentTabTitle = 'Datos Familiares';
    else if (url.includes('general-info')) this.currentTabTitle = 'Datos Generales';
    else if (url.includes('references')) this.currentTabTitle = 'Referencias';
    else if (url.includes('dew-info')) this.currentTabTitle = 'DEW';
    else this.currentTabTitle = '';
  }

  toggleEditMode() {
    this.isEditable = !this.isEditable;
    this.editModeSubject.next(this.isEditable);
  }

  onTabActivate(componentRef: any) {
    this.currentTabComponent = componentRef;
    this.editModeSubject.subscribe(mode => {
      if (this.currentTabComponent?.setEditMode) {
        this.currentTabComponent.setEditMode(mode);
      }
    });
  }

  handleClose() {
    this.closeModal();
    this.currentTabComponent.setEditMode(false);
    this.isEditable = false;
  }

}
