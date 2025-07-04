import { SelectOption } from "./select-option.model";
import {EnumResponseModel} from './enum.model';
import {ComponentModel} from '../../shared/components/members/details/detail.interface';

export class MemberListItem {
  id = 0;
  idNumber = '';
  surnames = '';
  names = '';
  birthdate: Date = new Date(0);
  birthCountry = '';
  residenceCountry = '';
  address = '';
  phoneNumber = '';
  cellphoneNumber = '';
  email = '';
  occupation = '';
  zonePastor = '';
  isPastor = false;
  isCellLeader = false;
  currentRole = '';
  status = '';
}

export class MemberBasicInfo implements ComponentModel {
  id = 0;
  idNumber = '';
  surnames = '';
  names = '';
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
  createdBy = '';
  updatedAt: Date = new Date(0);
  updatedBy = '';
}

export class MemberNames {
  id = 0;
  names = '';
  surnames = '';
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
  reasonsForCongregating = '';
}

export class MemberReference {
  id = 0;
  totalTime = 0;
  churchName = '';
  mainPastorName = '';
  leavingReason = '';
}

export class MemberGeneralInfo {
  id = 0;
  memberId = 0;
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
  id = 0;
  memberId = 0;
  ministrationDate: Date | null = new Date(0);
  worker1: string | null = '';
  worker2: string | null = '';
  isSharingTestimony = false;
  isPublishingTestimony = false;
  isPublishingTestimonyName = false;
  isAgreedShareTestimony = false;
}

export class Member {
  memberBasicInfo : MemberBasicInfo = new MemberBasicInfo();
  memberReferences: MemberReferences = new MemberReferences();
  memberInfo: MemberGeneralInfo = new MemberGeneralInfo();
  dewInfo: MemberDewInfo = new MemberDewInfo();
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
