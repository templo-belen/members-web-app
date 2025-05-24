export class LoginError {
  msg: string;
  code: number;

  constructor(msg: string, code: number) {
    this.msg = msg;
    this.code = code;
  }

  static isValid(error: LoginError | undefined): boolean {
    return error !== undefined && error.code !== undefined && error.msg !== undefined;
  }
}

export class UserModel {
  username: string;
  fullname: string;

  constructor(props: ({ username: string, fullname: string })) {
    this.username = props.username;
    this.fullname = props.fullname;
  }

}
