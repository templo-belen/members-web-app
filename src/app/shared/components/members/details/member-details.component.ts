import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ClrVerticalNavModule} from '@clr/angular';
import {editModeSubject} from '../../../../core/subjects/members.subjects';
import {CommonModule} from '@angular/common';
import {MemberService} from '../../../../core/services/member.service';

@Component({
  selector: 'app-member-details',
  imports: [RouterModule, ClrVerticalNavModule, CommonModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent implements OnInit {
  @Input({ required: true }) closeModal!: () => void;
  @Input({ required: true }) memberName!: string;
  @Input({ required: true }) memberId!: number;

  isEditable = false;
  currentTabTitle = 'Datos Personales';

  private _memberService = inject(MemberService);

  constructor(private router: Router, private route: ActivatedRoute) {
    editModeSubject.subscribe(mode => this.isEditable = mode);
  }

  ngOnInit() : void {
    this._memberService.dispatchMemberFormValues();
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  handleClose() {
    this.closeModal();
    this.currentTabTitle = 'Datos Personales';
    editModeSubject.next(false);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onLinkClick(event: MouseEvent, path: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isEditable) {
      return;
    }

    this.router.navigate([path], { relativeTo: this.route });

    const element = event.currentTarget as HTMLElement;
    this.currentTabTitle = element.textContent?.trim() ?? '';
  }

}
