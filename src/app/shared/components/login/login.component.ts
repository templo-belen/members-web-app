import {Component, computed, inject, Signal} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService = inject(UserService);
  private _error = toSignal(this._authService.fetchCurrentLoginError());
  public hasError = computed(() => this._error()?.code !== 200)
  public errorMsg: Signal<string | undefined> = computed(() => this._error()?.msg);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  public isInvalid(): boolean {
    return !this.form.valid;
  }

  public getErrorMsg(): string {
    return this.errorMsg()!;
  }

  public getHasError(): boolean {
    return this.hasError()!;
  }

  onSubmit() {
    this._authService.dispatchLogin(this.form.controls.username.value!, this.form.controls.password.value!);
  }
}
