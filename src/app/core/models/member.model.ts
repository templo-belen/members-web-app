import { SelectOption } from "./select-option.model";

export class MemberListItem {
  id: number = 0;
  idNumber: string = '';
  surnames: string = '';
  names: string = '';
  birthdate: Date = new Date(0);
  birthCountry: string = '';
  residenceCountry: string = '';
  address: string = '';
  phoneNumber: string = '';
  cellphoneNumber: string = '';
  email: string = '';
  occupation: string = '';
  zonePastor: string = '';
  isPastor: boolean = false;
  isCellLeader: boolean = false;
  currentRole: string = '';
  status: string = '';
}

export class MemberBasicInfo {
  id: number = 0;
  idNumber: string = '';
  surnames: string = '';
  names: string = '';
  birthdate: Date = new Date(0);
  birthCountry: string | null = '';
  residenceCountry: string | null = '';
  address: string | null = '';
  phoneNumber: string | null = '';
  cellphoneNumber: string | null = '';
  email: string | null = '';
  militaryService: string | null = '';
  studiesCompleted: string | null = '';
  degreeObtained: string | null = '';
  otherStudies: string | null = '';
  company: string | null = '';
  occupation: string | null = '';
  eps: string | null = '';
  rh: string | null = '';
  gender: string | null = '';
  preachingPoint: SelectOption | null = { id: 0, name: '' };
  currentRole: string | null = '';
  commitmentDate: Date | null = new Date(0);
  cellLeadership: string | null = '';
  zonePastor: MemberNames | null = { id: 0, names: '', surnames: '' };
  leadership: string | null = '';
  status: string | null = '';
  createdAt: Date = new Date(0);
  createdBy: string = '';
  updatedAt: Date = new Date(0);
  updatedBy: string = '';
}

export class MemberNames {
  id: number = 0;
  names: string = '';
  surnames: string = '';
}

export class MemberError {
  msg: string;
  code: number;

  constructor(props: ({ msg: string, code: number })) {
    this.msg = props.msg;
    this.code = props.code;
  }
}

export class MemberReferences {
  references: MemberReference[] = [];
  reasonsForCongregating: string = '';
}

export class MemberReference { 
  id: number = 0;
  totalTime: number = 0;
  churchName: string = '';
  mainPastorName: string = '';
  leavingReason: string = '';
} 





