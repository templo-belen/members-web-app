import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { MembersService } from '../../../../core/services/members.service';
import { Member } from '../../../../core/models/member.model';

@Component({
  selector: 'app-members-list',
  imports: [ClrDatagridModule, ClrIconModule, CommonModule],
  templateUrl: './list.members.component.html',
  styleUrl: './list.members.component.scss',
  providers: [MembersService],
  standalone: true
})
export class MembersListComponent {
  members: Member[];

  constructor(public service: MembersService) {
    this.members = this.service.all;
  }

}

