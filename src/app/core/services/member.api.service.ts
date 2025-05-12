import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MemberErrorResponseModel, MemberListResponseModel } from '../models/api-response.model';
import { MemberBasicInfo } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _http = inject(HttpClient);

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | MemberErrorResponseModel> {
    return this._http.get<MemberBasicInfo[]>('http://localhost:8000/members', { observe: "response" })
      .pipe(
        map(response => {
          return new MemberListResponseModel({ memberList: response.body! });
        }),
        catchError(error => {
          return of(new MemberErrorResponseModel({ msg: error.error.msg, code: error.status }));
        })
      );
  }

  public basicInfoById(memberId: number): Observable<MemberBasicInfo | MemberErrorResponseModel> {
    // TODO: move base URL to environments
    // https://github.com/templo-belen/members-web-app/issues/34
    return this._http.get<MemberBasicInfo>(`http://localhost:8000/members/${memberId}`, { observe: "response" })
      .pipe(
        map(response => {
          return new MemberBasicInfo(response.body!);
        }),
        catchError(error => {
          return of(new MemberErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }
}


