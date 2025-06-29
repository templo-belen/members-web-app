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
      "fullName": "Administrador Dominguez",
      "role": 1
    }),
    new UserModel({
      "id": 2,
      "username": "pastor",
      "fullName": "Pastor Maldonado",
      "role": 2
    }),
    new UserModel({
      "id": 3,
      "username": "readonly",
      "fullName": "Readonly Pérez",
      "role": 3
    }),
    new UserModel({
      "id": 4,
      "username": "pedroegv",
      "fullName": "Pedro Enrique Gónzalez Valdivieso",
      "role": 3
    }),
    new UserModel({
      "id": 5,
      "username": "erisohv",
      "fullName": "Erika Sophia Herná}ndez Villasmil",
      "role": 3
    }),
    new UserModel({
      "id": 6,
      "username": "jgluna",
      "fullName": "Juan Guillermo Luna Aristizabal",
      "role": 3
    }),
    new UserModel({
      "id": 7,
      "username": "frjrosas",
      "fullName": "Francisco Javier Rosas Jimenez",
      "role": 3
    }),
    new UserModel({
      "id": 8,
      "username": "leinadanul",
      "fullName": "Daniel Rmirez Luna",
      "role": 3
    }),
    new UserModel({
      "id": 9,
      "username": "yfarfan",
      "fullName": "Yelitza Coromoto Farfán Angarita",
      "role": 3
    })
  ];

  ngOnInit(): void {

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
