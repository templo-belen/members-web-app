import { Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { UserService } from '../../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserModel } from '../../../core/models/user.model';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, ClarityModule, AvatarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  private _userService = inject(UserService);

  currentUser: Signal<UserModel> = toSignal(this._userService.fetchCurrentUser(), { initialValue: new UserModel({ username: '', fullname: '' }) });

  logout() {
    this._userService.dispatchLogout();
  }
}
