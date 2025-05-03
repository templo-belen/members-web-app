export class LoginError {
  msg: string;
  code: number;

  constructor(props: ({ msg: string, code: number })) {
    this.msg = props.msg;
    this.code = props.code;
  }
}

export class UserModel {
  userId: number;
  username: string;

  constructor(props: ({ userId: number, username: string })) {
    this.userId = props.userId;
    this.username = props.username;
  }

}
