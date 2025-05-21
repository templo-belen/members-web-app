import { MemberListItem } from "./member.model";

export class LoginResponseModel {
  userId: number;
  username: string;
  token: string;
  name: string;
  surname: string;

  constructor(props: LoginResponseModel) {
    this.name = props.name;
    this.token = props.token;
    this.surname = props.surname;
    this.username = props.username;
    this.userId = props.userId;
  }
}

export class LoginErrorResponseModel {
  code: number;
  msg: string;

  constructor(props: ({ code: number, msg: string })) {
    this.code = props.code;
    this.msg = props.msg;
  }

}

export class MemberListResponseModel {
  memberList: MemberListItem[];

  constructor(props: ({ memberList: MemberListItem[] })) {
    this.memberList = props.memberList;
  }
}

export class MemberErrorResponseModel {
  code: number;
  msg: string;

  constructor(props: ({ code: number, msg: string })) {
    this.code = props.code;
    this.msg = props.msg;
  }
}
export class MemberDewInfoResponseModel {
  id: number = 0;
  memberId: number = 0;
  ministrationDate: string | null = '';
  worker1: string | null = '';
  worker2: string | null = '';
  isSharingTestimony: boolean = false;
  isPubilshingTestimony: boolean = false;
  isPubilshingTestimonyName: boolean = false;
  isAgreedShareTestimony: boolean = false;
}
