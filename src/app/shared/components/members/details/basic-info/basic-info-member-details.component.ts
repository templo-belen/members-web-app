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
<<<<<<< feature/controller-implementation
  private _formBuilder = inject(FormBuilder);

  model = output<MemberBasicInfo>();
  isEditable = input.required<boolean>();
  inputModel = input.required<MemberBasicInfo>();
  basicInfo = this._memberService.fetchCurrentMemberBasicInfo();
  memberFormValues = this._memberService.selectMemberFormValues()
  requiredFieldError: string = 'Este campo es obligatorio';
  invalidFormatError: string = 'El formato es incorrecto';

  form: FormGroup = this.buildForm(this.basicInfo());
=======
  private _fb = inject(FormBuilder);

  @ViewChild('formElement') formElement!: ElementRef<HTMLFormElement>;

  memberId = 0;
  basicInfoForm: FormGroup;
  isEditable = false;
  memberFormValues: MemberFormValues = {
    enums: new EnumResponseModel,
    zonePastors: [],
    preachingPoints: []
  }

  // TODO: replace with key in the HTML when applying i18n.
  requiredFieldError = 'Este campo es obligatorio';
  invalidFormatError = 'El formato es incorrecto';

  constructor() {
    this.basicInfoForm = this.buildForm(new MemberBasicInfo());
    this.setFormEditable();
  }

  buildForm(memberBasicInfo: MemberBasicInfo): FormGroup {
    const form = this._fb.group({
      ...memberBasicInfo,
      file: new FormControl<FileList | undefined>(undefined),  //TODO evaluar si formara parte del modelo
    });
>>>>>>> master


  constructor() {
    effect(() => {
      if (this.inputModel!) {
        this.form.patchValue({...this.inputModel()});
        console.log(`values: ${JSON.stringify(this.form.value)}`);
      }

      if (this.isEditable()) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    });
  }

<<<<<<< feature/controller-implementation
  getForm(): FormGroup {
    return this.form;
  }

  getComponentModel(): ComponentModel {
    return this.inputModel();
=======
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
>>>>>>> master
  }

  buildForm(basicInfo: MemberBasicInfo): FormGroup {
    const phoneRegex = /^(\+\d{1,3})?(\s\(\d{3}\)\s|\s?\d{3}[\s-]?)\d{3}[\s-]?\d{4,6}$/;
    return this._formBuilder.group({
      ...basicInfo,
      idNumber: new FormControl('', [Validators.required]),
      names: new FormControl('', [Validators.required]),
      surnames: new FormControl('', [Validators.required]),
      currentRole: new FormControl('', [Validators.required]),
      cellLeadership: new FormControl('', [Validators.required]),
      commitmentDate: new FormControl('', [Validators.required]),
      leadership: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.pattern(phoneRegex)]),
      cellphoneNumber: new FormControl('', [Validators.pattern(phoneRegex)]),
      email: new FormControl('', [Validators.email]),
      file: new FormControl<FileList | undefined>(undefined),  //TODO evaluar si formara parte del modelo
    });
  }

  onFileSelected(event: any) {

  }

  onSubmit() {
    this.model.emit({...this.form.value});
  }
}
