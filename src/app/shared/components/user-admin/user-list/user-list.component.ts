import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { RoleResponseModel, UserModel } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [
    ClrIconModule,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private _userService = inject(UserService);
  @Output() editUser = new EventEmitter<UserModel>();

  roles: RoleResponseModel[] = [];

  // TODO: replace with actual list
  userList = [
    new UserModel({
      "id": 1,
      "username": "admin",
      "fullname": "Administrador Dominguez",
      "role": 1
    }),
    new UserModel({
      "id": 2,
      "username": "pastor",
      "fullname": "Pastor Maldonado",
      "role": 2
    }),
    new UserModel({
      "id": 3,
      "username": "readonly",
      "fullname": "Readonly Pérez",
      "role": 3
    }),
    new UserModel({
      "id": 4,
      "username": "pedroegv",
      "fullname": "Pedro Enrique Gónzalez Valdivieso",
      "role": 3
    }),
    new UserModel({
      "id": 5,
      "username": "erisohv",
      "fullname": "Erika Sophia Herná}ndez Villasmil",
      "role": 3
    }),
    new UserModel({
      "id": 6,
      "username": "jgluna",
      "fullname": "Juan Guillermo Luna Aristizabal",
      "role": 3
    }),
    new UserModel({
      "id": 7,
      "username": "frjrosas",
      "fullname": "Francisco Javier Rosas Jimenez",
      "role": 3
    }),
    new UserModel({
      "id": 8,
      "username": "leinadanul",
      "fullname": "Daniel Rmirez Luna",
      "role": 3
    }),
    new UserModel({
      "id": 9,
      "username": "yfarfan",
      "fullname": "Yelitza Coromoto Farfán Angarita",
      "role": 3
    })
  ];

  ngOnInit(): void {
    this._userService.dispatchRoleList();

    this._userService.fetchRoleList().subscribe(roleList => {
      this.roles = roleList;
    })

  }

  onEditUser(userModel: UserModel) {
    this.editUser.emit(userModel);
  }

  getRoleName(roleId: number): string | null {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : '-';
  }
}
