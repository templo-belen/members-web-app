import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MembersListComponent } from './list/list.members.component';
import { MemberService } from '../../../core/services/member.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-members',
  imports: [MembersListComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  standalone: true
})
export class MembersComponent implements OnInit {
  private _memberService = inject(MemberService);

  private readonly _dataList = toSignal(this._memberService.fetchMemberList(), { initialValue: [] });
  private readonly _error = toSignal(this._memberService.fetchCurrentMemberListError());
  private readonly _isLoading = toSignal(this._memberService.fetchIsLoading(), { initialValue: true });

  public membersList = this._dataList;
  public isLoading = this._isLoading;
  public hasError = computed(() => this._error()?.code !== 200)
  public errorMsg: Signal<string | undefined> = computed(() => this._error()?.msg);

  public getErrorMsg(): string {
    return this.errorMsg()!;
  }

  public getHasError(): boolean {
    return this.hasError()!;
  }
  ngOnInit(): void {
    this._memberService.dispatchList();
  }
}
