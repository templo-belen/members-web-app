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

  constructor(props: ({code: number, msg: string})) {
    this.code = props.code;
    this.msg = props.msg;
  }

}
