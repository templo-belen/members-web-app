import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClrModalModule } from '@clr/angular';
import { UserListComponent } from '../user-list/user-list.component';
import { UserModel } from '../../../../core/models/user.model';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-admin-dialog',
  imports: [
    ClrModalModule,
    CommonModule,
    UserListComponent,
    UserEditComponent,
  ],
  templateUrl: './user-admin-dialog.component.html',
  styleUrl: './user-admin-dialog.component.scss'
})
export class UserAdminDialogComponent {

  opened = false;
  isEditing = false;
  selectedUser: UserModel | null = null;

  private _userService = inject(UserService);

  openModal() {
    this.opened = true;
    this._userService.dispatchRoleList();
  }

  closeModal() {
    this.opened = false;
    this.isEditing = false;
  }

  onNewUser() {
    const newUser = new UserModel({ id: null, username: '', fullName: '', role: 3 });
    this.onEditUser(newUser);
  }

  onEditUser(user: UserModel) {
    this.selectedUser = user;
    this.isEditing = true;
  }

  onSave() {
    // TODO
  }
}
