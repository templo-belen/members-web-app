import { Injectable } from '@angular/core';
import MEMBERS from './members.json';
import { Member } from '../models/member.model';

@Injectable()
export class MembersService {
  size = 100;
  generatedCount = 0;
  latency = 0;

  private _members: Member[] = MEMBERS.map((member) => ({
    ...member,
    memberSince: new Date(member.memberSince)
  }));

  get all(): Member[] {
    return this._members;
  }
}
