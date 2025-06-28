import { Component, inject, Signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { UserService } from '../../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserModel } from '../../../core/models/user.model';
import { AvatarComponent } from '../avatar/avatar.component';
import { UserAdminDialogComponent } from '../user-admin/user-admin-dialog/user-admin-dialog.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    ClarityModule,
    AvatarComponent,
    UserAdminDialogComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  private _userService = inject(UserService);

  @ViewChild(UserAdminDialogComponent) userAdminDialog: UserAdminDialogComponent | undefined;

  currentUser: Signal<UserModel> = toSignal(this._userService.fetchCurrentUser(), { initialValue: new UserModel({ username: '', fullName: '' }) });

  logout() {
    this._userService.dispatchLogout();
  }
}
