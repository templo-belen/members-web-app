export class EnumOption {
    name = "";
    value = "";
}

export class EnumResponseModel {
    [key: string]: EnumOption[]
}
