import { Component } from '@angular/core';
import { MembersListComponent } from './list/list.members.component';

@Component({
  selector: 'app-members',
  imports: [MembersListComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  standalone: true
})
export class MembersComponent {

}
