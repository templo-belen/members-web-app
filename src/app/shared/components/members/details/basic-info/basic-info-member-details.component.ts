import {Component, effect, inject, input, output} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {MemberBasicInfo} from '../../../../../core/models/member.model';
import {CommonModule, formatDate} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MemberService} from '../../../../../core/services/member.service';
import {ComponentModel, DetailComponent} from '../detail.interface';

@Component({
  selector: 'app-basic-info-member-details',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info-member-details.component.html',
  styleUrl: './basic-info-member-details.component.scss',
})
export class BasicInfoMemberDetailsComponent implements DetailComponent {
  private _memberService = inject(MemberService);
  private _formBuilder = inject(FormBuilder);

  model = output<MemberBasicInfo>();
  isEditable = input.required<boolean>();
  inputModel = input.required<MemberBasicInfo>();
  basicInfo = this._memberService.fetchCurrentMemberBasicInfo();
  memberFormValues = this._memberService.selectMemberFormValues()

  form: FormGroup = this.buildForm(this.basicInfo());


  constructor() {
    effect(() => {
      if (this.inputModel!) {
        this.form.patchValue({...this.inputModel()});
      }

      if (this.isEditable()) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    });
  }


  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    const form = this._formBuilder.group({
      ...memberBasicInfo,
      file: new FormControl<FileList | undefined>(undefined),  //TODO evaluar si formara parte del modelo
    });

    // Required fields
    form.get('idNumber')?.addValidators(Validators.required);
    form.get('names')?.addValidators(Validators.required);
    form.get('surnames')?.addValidators(Validators.required);
    form.get('currentRole')?.addValidators(Validators.required);
    form.get('cellLeadership')?.addValidators(Validators.required);
    form.get('leadership')?.addValidators(Validators.required);

    // Additional validations
    const phoneRegex = /^(\+\d{1,3})?(\s\(\d{3}\)\s|\s?\d{3}[\s-]?)\d{3}[\s-]?\d{4,6}$/;
    form.get('phoneNumber')?.addValidators(Validators.pattern(phoneRegex));
    form.get('cellphoneNumber')?.addValidators(Validators.pattern(phoneRegex));
    form.get('email')?.addValidators(Validators.email);


    return form;
  }

  onFileSelected(event: any) {

  }

  onSubmit() {
    this.model.emit({...this.form.value});
  }
}
