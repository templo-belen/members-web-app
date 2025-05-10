import { SelectOption } from "./select-option.model";

export class MemberBasicInfo {
  id: number;
  idNumber: string;
  surnames: string;
  names: string;
  isPastor: boolean;
  isCellLeader: boolean;
  birthdate?: Date;
  birthCountry?: string;
  residenceCountry?: string;
  address?: string;
  phoneNumber?: string;
  cellphoneNumber?: string;
  email?: string;
  militaryService?: string;
  studiesCompleted?: string;
  degreeObtained?: string;
  otherStudies?: string;
  company?: string;
  occupation?: string;
  eps?: string;
  rh?: string;
  gender?: string;
  preachingPoint?: SelectOption;
  commitmentDate?: Date;
  cellLeadership?: string;
  zonePastor?: MemberNames;
  currentRole?: string;
  leadership?: string;
  status: string;

  constructor(props: MemberBasicInfo) {
    this.id = props.id;
    this.names = props.names;
    this.idNumber = props.idNumber;
    this.surnames = props.surnames;
    this.isPastor = props.isPastor;
    this.isCellLeader = props.isCellLeader;
    this.birthdate = props.birthdate;
    this.birthCountry = props.birthCountry;
    this.residenceCountry = props.residenceCountry;
    this.address = props.address;
    this.phoneNumber = props.phoneNumber;
    this.cellphoneNumber = props.cellphoneNumber;
    this.email = props.email;
    this.militaryService = props.militaryService;
    this.studiesCompleted = props.studiesCompleted;
    this.degreeObtained = props.degreeObtained;
    this.otherStudies = props.otherStudies;
    this.company = props.company;
    this.occupation = props.occupation;
    this.eps = props.eps;
    this.rh = props.rh;
    this.gender = props.gender;
    this.preachingPoint = props.preachingPoint;
    this.commitmentDate = props.commitmentDate;
    this.cellLeadership = props.cellLeadership;
    this.zonePastor = props.zonePastor;
    this.currentRole = props.currentRole;
    this.leadership = props.leadership;
    this.status = props.status;

  }

  static empty(): MemberBasicInfo {
    return {
      id: 0,
      idNumber: '',
      surnames: '',
      names: '',
      isPastor: false,
      isCellLeader: false,
      birthdate: new Date(0),
      birthCountry: '',
      residenceCountry: '',
      address: '',
      phoneNumber: '',
      cellphoneNumber: '',
      email: '',
      militaryService: '',
      studiesCompleted: '',
      degreeObtained: '',
      otherStudies: '',
      company: '',
      occupation: '',
      eps: '',
      rh: '',
      gender: '',
      preachingPoint: new SelectOption({ id: 0, name: '' }),
      commitmentDate: new Date(0),
      cellLeadership: '',
      zonePastor: new MemberNames({ id: 0, names: '', surnames: '' }),
      currentRole: '',
      leadership: '',
      status: '',
    };
  }
}

export class MemberNames {
  id: number;
  names: string;
  surnames: string;

  constructor(props: MemberNames) {
    this.id = props.id;
    this.names = props.names;
    this.surnames = props.surnames;
  }
}

export class MemberError {
  msg: string;
  code: number;

  constructor(props: ({ msg: string, code: number })) {
    this.msg = props.msg;
    this.code = props.code;
  }
}


