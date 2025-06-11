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
  id?: number | null = null;
  username: string | null = null;
  fullname: string | null = null;
  role?: number;

  constructor(props: UserModel) {
    this.id = props.id ?? null;
    this.username = props.username;
    this.fullname = props.fullname;
    this.role = props.role;
  }

}
