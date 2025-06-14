import {CommonModule} from '@angular/common';
import {Component, inject, input, Input, output, signal, Signal} from '@angular/core';
import {ClrDatagridModule, ClrIconModule, ClrProgressBarModule} from '@clr/angular';
import {MemberListItem} from '../../../../core/models/member.model';
import {CheckIconFilter} from '../../filters/grid.boolean.filter'
import {MemberService} from '../../../../core/services/member.service';

@Component({
  selector: 'app-members-list',
  imports: [ClrDatagridModule, ClrIconModule, CommonModule, ClrProgressBarModule, CheckIconFilter],
  templateUrl: './list.members.component.html',
  styleUrl: './list.members.component.scss',
  standalone: true
})
export class MembersListComponent {
  private _memberService = inject(MemberService);
  membersList = input.required<MemberListItem[]>();
  isLoading = input.required<boolean>();
  onSelection = output<void>();

  onDetailIconClick(memberId: number, memberName: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent row selection if enabled
    this._memberService.dispatchMember(memberId);
    this._memberService.dispatchMemberFormValues();
    this.onSelection.emit();
  }
}

