export class EnumOption {
  name: string = "";
  value: string = "";
}

export class EnumResponseModel{
  [key: string]: EnumOption[]
}
