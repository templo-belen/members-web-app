import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, ClrFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnChanges {

  private _fb = inject(FormBuilder);

  @Input() user: UserModel | null = null;

  userForm: FormGroup = new FormGroup({});

  requiredFieldError = 'Este campo es obligatorio';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.userForm = this._fb.group({
        ...this.user,
        password: new FormControl([''])
      });
    }
  }

  onSubmit() {
      // TODO
  }
}
