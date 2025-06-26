import {Component, inject, output} from '@angular/core';
import {ClrIconModule, ClrVerticalNavModule} from '@clr/angular';
import {NgIf} from '@angular/common';
import {MemberService} from '../../../../core/services/member.service';
import {MemberDetailsComponent} from '../details/member-details.component';

@Component({
  selector: 'app-member-showcase',
  imports: [
    ClrIconModule,
    ClrVerticalNavModule,
    NgIf,
    MemberDetailsComponent
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {
  private _memberService = inject(MemberService);

  closeModal = output<void>();
  selectedMember = this._memberService.fetchCurrentMember();

  isEditable = false;
  selected = "basicInfo";
  operation = 'NOOP';
  currentTabTitle = 'Datos Personales';

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  updateModel() {
    this.operation = 'PUT';
  }

  handleClose() {
    this.closeModal.emit();
    this.currentTabTitle = 'Datos Personales';
    this.isEditable = false;
  }

  select(option: string) {
    this.selected = option;
  }

  public onSave() {
    // TODO
  }
}
