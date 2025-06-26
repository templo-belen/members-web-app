import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClrModalModule } from '@clr/angular';
import { UserListComponent } from '../user-list/user-list.component';
import { UserModel } from '../../../../core/models/user.model';
import { UserEditComponent } from '../user-edit/user-edit.component';

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

  openModal() {
    this.opened = true;
  }

  closeModal() {
    this.opened = false;
    this.isEditing = false;
  }

  onNewUser() {
    const newUser = new UserModel({ id: null, username: '', fullname: '', role: 3 });
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
