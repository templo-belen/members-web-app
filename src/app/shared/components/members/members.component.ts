import {Component, computed, inject, OnInit, Signal, ViewChild} from '@angular/core';
import {MembersListComponent} from './list/list.members.component';
import {MemberService} from '../../../core/services/member.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ClrModalModule, ClrWizard} from '@clr/angular';
import {CommonModule} from '@angular/common';
import {MemberDetailsComponent} from './details/member-details.component';
import {ActivatedRoute, Router} from '@angular/router';
import { NewMemberWizardComponent } from './new-member-wizard/new-member-wizard.component';

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

  private readonly _dataList = toSignal(this._memberService.fetchMemberList(), { initialValue: [] });
  private readonly _error = toSignal(this._memberService.fetchCurrentMemberListError());
  private readonly _isLoading = toSignal(this._memberService.fetchIsLoading(), { initialValue: true });
  public isModalOpen = false;
  public selectedMemberId: number = -1;
  public selectedMemberName: string = '';
  public membersList = this._dataList;
  public isLoading = this._isLoading;
  public hasError = computed(() => this._error()?.code !== 200)
  public errorMsg: Signal<string | undefined> = computed(() => this._error()?.msg);

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

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

    this._router.navigate(['basic-info'], {relativeTo: this._route});

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
