import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { ClrDatagridModule, ClrIconModule, ClrProgressBarModule } from '@clr/angular';
import { MemberListItem } from '../../../../core/models/member.model';

@Component({
  selector: 'app-members-list',
  imports: [ClrDatagridModule, ClrIconModule, CommonModule, ClrProgressBarModule],
  templateUrl: './list.members.component.html',
  styleUrl: './list.members.component.scss',
  standalone: true
})
export class MembersListComponent {
  @Input({ required: true }) membersList!: Signal<MemberListItem[]>;
  @Input({ required: true }) isLoading!: Signal<boolean>;
  @Input({ required: true }) openModal!: (memberId: number, memberName: string) => void;

  onDetailIconClick(memberId: number, memberName: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent row selection if enabled
    this.openModal(memberId, memberName);
  }

}

