import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrVerticalNavModule } from '@clr/angular';
import { editModeSubject } from '../../../../core/subjects/members.subjects';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule, CommonModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent {
  @Input({ required: true }) closeModal!: () => void;
  @Input({ required: true }) memberName!: string;
  @Input({ required: true }) memberId!: number;

  isEditable = false;
  currentTabTitle = 'Datos Personales';

  constructor() {
    editModeSubject.subscribe(mode => this.isEditable = mode);
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  handleClose() {
    this.closeModal();
    this.currentTabTitle = 'Datos Personales';
    editModeSubject.next(false);
  }

  onLinkClick(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    this.currentTabTitle = element.textContent?.trim() ?? '';
  }

}
