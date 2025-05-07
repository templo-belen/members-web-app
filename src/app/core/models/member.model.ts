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
  occupation?: string;
  zonePastor?: string;
  currentRole?: string;
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
    this.occupation = props.occupation;
    this.zonePastor = props.zonePastor;
    this.currentRole = props.currentRole;
    this.status = props.status;

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


