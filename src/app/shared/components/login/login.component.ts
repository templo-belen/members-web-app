import {Component, computed, inject} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService = inject(UserService);
  private _user = computed(() => this._authService.fetchCurrentUser());
  //private _error = computed(() =)

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  public isInvalid(): boolean {
    return !this.form.valid;
  }

  public hasError(): boolean {
    return false;
  }

  onSubmit() {
    this._authService.dispatchLogin(this.form.controls.username.value!, this.form.controls.password.value!);
  }
}
