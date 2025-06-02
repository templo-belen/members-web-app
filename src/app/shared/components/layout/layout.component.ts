import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import {MembersComponent} from '../members/members.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, ClarityModule, MembersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
