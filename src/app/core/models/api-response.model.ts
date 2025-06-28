import {MemberListItem} from "./member.model";

export class LoginResponseModel {
  fullName: string;
  username: string;
  token: string;

  constructor(props: ({ token: string, username: string, fullName: string })) {
    this.token = props.token;
    this.username = props.username;
    this.fullName = props.fullName;
  }
}


export class MemberListResponseModel {
  memberList: MemberListItem[];

  constructor(props: ({ memberList: MemberListItem[] })) {
    this.memberList = props.memberList;
  }
}

export class ErrorResponseModel {
  code: number;
  msg: string;

  constructor(props: ({ code: number, msg: string })) {
    this.code = props.code;
    this.msg = props.msg;
  }
}
export class MemberDewInfoResponseModel {
  id = 0;
  memberId = 0;
  ministrationDate: string | null = '';
  worker1: string | null = '';
  worker2: string | null = '';
  isSharingTestimony = false;
  isPublishingTestimony = false;
  isPublishingTestimonyName = false;
  isAgreedShareTestimony = false;
}
