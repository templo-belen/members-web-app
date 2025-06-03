import { SelectOption } from "./select-option.model";
import {EnumResponseModel} from './enum.model';

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
  birthCountry: string | null = null;
  residenceCountry: string | null = null;
  address: string | null = null;
  phoneNumber: string | null = null;
  cellphoneNumber: string | null = null;
  email: string | null = null;
  militaryService: string | null = null;
  studiesCompleted: string | null = null;
  degreeObtained: string | null = null;
  otherStudies: string | null = null;
  company: string | null = null;
  occupation: string | null = null;
  eps: string | null = null;
  rh: string | null = null;
  gender: string | null = null;
  preachingPoint: number | null = null;
  currentRole: string | null = null;
  commitmentDate: Date | null = new Date(0);
  cellLeadership: string | null = null;
  zonePastor: number | null = null;
  leadership: string | null = null;
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

export class MemberGeneralInfo {
  id: number = 0;
  memberId: number = 0;
  conversionDate: Date | null = new Date(0);
  conversionPlace: string | null = '';
  baptismDate: Date | null = new Date(0);
  baptismPlace: string | null = '';
  baptismHolySpiritDate: Date | null = new Date(0);
  baptismHolySpiritPlace: string | null = '';
  baptismPastorName: string | null = '';
  baptismDenomination: string | null = '';
  activeMemberSince: Date | null = new Date(0);
  leavingReason: string | null = '';
  leavingReasonDescription: string | null = '';
  leavingDate: Date | null = new Date(0);
  acceptanceComment: string | null = '';
}

export class MemberDewInfo {
  id: number = 0;
  memberId: number = 0;
  ministrationDate: Date | null = new Date(0);
  worker1: string | null = '';
  worker2: string | null = '';
  isSharingTestimony: boolean = false;
  isPublishingTestimony: boolean = false;
  isPublishingTestimonyName: boolean = false;
  isAgreedShareTestimony: boolean = false;
}

export class MemberFormValues {
  enums: EnumResponseModel = {};
  zonePastors: MemberNames[]  = [];
  preachingPoints: SelectOption[] = [];
}

export class MemberInformation {
  personalInformation: MemberBasicInfo | null = null;
  dew: MemberDewInfo | null = null;
  generalData: MemberGeneralInfo | null = null;
  familyData: any | null = null;    // TODO cambiar al modelo de family data con tarea https://github.com/templo-belen/members-web-app/issues/15
  references: MemberReferences | null = null;
  adn: any | null = null;           // TODO cambiar al modelo de adn con tarea https://github.com/templo-belen/members-web-app/issues/21
}
