import {Component, computed, inject, Signal} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {LoginError} from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService = inject(UserService);
  private _error = this._authService.fetchCurrentLoginError();
  public hasError = computed(() => LoginError.isValid(this._error()) && this._error()!.code !== 200);
  public errorMsg: Signal<string | undefined> = computed(() => this.hasError() ? this._error()!.msg : '');

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  public isInvalid(): boolean {
    return !this.form.valid;
  }

  onSubmit() {
    this._authService.dispatchLogin(this.form.controls.username.value!, this.form.controls.password.value!);
  }
}
