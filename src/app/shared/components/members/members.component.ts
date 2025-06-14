import {Component, computed, inject, OnInit, Signal, viewChild, ViewChild} from '@angular/core';
import {MembersListComponent} from './list/list.members.component';
import {MemberService} from '../../../core/services/member.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ClrModalModule} from '@clr/angular';
import {CommonModule} from '@angular/common';
import {MemberDetailsComponent} from './details/member-details.component';
import {NewMemberWizardComponent} from './new-member-wizard/new-member-wizard.component';

@Component({
  selector: 'app-members',
  imports: [
    MembersListComponent,
    ClrModalModule,
    CommonModule,
    MemberDetailsComponent,
    NewMemberWizardComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  standalone: true
})
export class MembersComponent implements OnInit {
  private _memberService = inject(MemberService);

  memberDetailsReference: Signal<MemberDetailsComponent> = viewChild.required(MemberDetailsComponent);
  private readonly _dataList = toSignal(this._memberService.fetchMemberList(), { initialValue: [] });
  private readonly _error = toSignal(this._memberService.fetchCurrentMemberListError());
  private readonly _isLoading = toSignal(this._memberService.fetchIsLoading(), { initialValue: true });
  public isModalOpen = false;
  public selectedMemberId = -1;
  public selectedMemberName = '';
  public membersList = this._dataList;
  public isLoading = this._isLoading;
  public hasError = computed(() => this._error()?.code !== 200)
  public errorMsg: Signal<string | undefined> = computed(() => this._error()?.msg);

  @ViewChild('newMemberWizard') newMemberWizard: NewMemberWizardComponent | undefined;

  public getErrorMsg(): string {
    return this.errorMsg()!;
  }

  public getHasError(): boolean {
    return this.hasError()!;
  }

  public openModal = (memberId: number, memberName: string) => {
    this.selectedMemberId = memberId;
    this.selectedMemberName = memberName;
    this._memberService.dispatchSelectedMemberId(this.selectedMemberId);
    this.isModalOpen = true;
  }

  public closeModal = () => {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this._memberService.dispatchList();
  }

  openNewMemberWizard() {
    this.newMemberWizard?.open();
  }

}
