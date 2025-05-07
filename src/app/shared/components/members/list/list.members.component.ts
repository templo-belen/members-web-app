import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { ClrDatagridModule, ClrIconModule, ClrProgressBarModule } from '@clr/angular';
import { MemberBasicInfo } from '../../../../core/models/member.model';

@Component({
  selector: 'app-members-list',
  imports: [ClrDatagridModule, ClrIconModule, CommonModule, ClrProgressBarModule],
  templateUrl: './list.members.component.html',
  styleUrl: './list.members.component.scss',
  standalone: true
})
export class MembersListComponent {
  @Input({ required: true }) membersList!: Signal<MemberBasicInfo[]>;
  @Input({ required: true }) isLoading!: Signal<boolean>;

}

