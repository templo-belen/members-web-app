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

  constructor() {
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
    this.currentTabTitle = 'Datos Personales';
    this.isEditable = false;
  }

  onLinkClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    this.currentTabTitle = element.textContent?.trim() ?? '';
  }

}
