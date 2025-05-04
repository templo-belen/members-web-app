export interface Member {
  id: string
  name: string
  names?: string
  lastName?: string;
  lastName2?: string;
  zoneLeader: string
  memberSince: Date
  profileImageUrl?: string;
  identificationNumber?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  country?: string;
  address?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  email?: string;
}
