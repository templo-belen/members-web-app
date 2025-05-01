import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';

@Component({
  selector: 'app-members',
  imports: [ClrDatagridModule, ClrIconModule, CommonModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  providers: [MembersService]
})
export class MembersComponent {
  members: Member[];

  constructor(public service: MembersService) {
    this.members = this.service.all;
  }

}
