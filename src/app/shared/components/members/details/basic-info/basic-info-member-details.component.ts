import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { MemberBasicInfo, MemberFormValues } from '../../../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../../../../core/services/member.service';
import { editModeSubject } from '../../../../../core/subjects/members.subjects';
import { EnumResponseModel } from '../../../../../core/models/enum.model';

@Component({
  selector: 'app-basic-info-member-details',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info-member-details.component.html',
  styleUrl: './basic-info-member-details.component.scss',
})
export class BasicInfoMemberDetailsComponent implements OnInit {

  private _memberService = inject(MemberService);

  @ViewChild('formElement') formElement!: ElementRef<HTMLFormElement>;

  memberId: number = 0;
  basicInfoForm: FormGroup;
  isEditable: boolean = false;
  memberFormValues: MemberFormValues = {
    enums: new EnumResponseModel,
    zonePastors: [],
    preachingPoints: []
  }

  // TODO: replace with key in the HTML when applying i18n.
  requiredFieldError = 'Este campo es obligatorio';
  invalidFormatError = 'El formato es incorrecto';

  constructor(private fb: FormBuilder) {
    this.basicInfoForm = this.buildForm(new MemberBasicInfo());
    this.setFormEditable();
  }

  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    const form = this.fb.group({
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

  ngOnInit(): void {
    editModeSubject.subscribe(mode => {
      this.isEditable = mode;
      this.setFormEditable();
    });

    this._memberService.fetchMemberBasicInfo().subscribe(memberBasicInfo => {
      this.memberId = memberBasicInfo.id;
      this.basicInfoForm = this.buildForm(memberBasicInfo);
      this.setFormEditable();
    });

    // Enums
    this._memberService.fetchMemberFormValues().subscribe(memberFormValues => {
      this.memberFormValues = memberFormValues;
    });

    this.basicInfoForm.disable();
  }

  onFileSelected(event: any) {

  }

  onSubmit() {
    this.triggerFocusAndBlurEvents();

    if (!this.basicInfoForm.valid) {
      return;
    }

    if (this.memberId === 0) {
      this._memberService.dispatchMemberBasicInfoCreate(this.formToModel());
    } else {
      // TODO: implement update logic
    }
  }

  // Trick for triggering all error messages
  private triggerFocusAndBlurEvents() {
    const elements = this.formElement
      .nativeElement
      .querySelectorAll('input, select');

    elements.forEach((element: any) => {
      if (element.focus && element.blur) {
        element.focus();
        element.blur();
      }
    });
  }

  toggleEditMode() {
    editModeSubject.next(!this.isEditable);
  }

  setFormEditable() {
    if (this.isEditable) {
      this.basicInfoForm.enable();
    } else {
      this.basicInfoForm.disable();
    }
  }

  formToModel(): MemberBasicInfo {
    return Object.assign(new MemberBasicInfo(), this.basicInfoForm.value);
  }
}
