import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrVerticalNavModule } from '@clr/angular';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent {
}
