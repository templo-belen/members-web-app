import {Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(),
    type: new FormControl(),
  });
}
