import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MemberErrorResponseModel, MemberListResponseModel } from '../models/api-response.model';
import { MemberBasicInfo, MemberListItem } from '../models/member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | MemberErrorResponseModel> {
    return this._http.get<MemberListItem[]>(`${this._baseUrl}/members`, { observe: "response" })
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
    return this._http.get<MemberBasicInfo>(`${this._baseUrl}/members/${memberId}`, { observe: "response" })
      .pipe(
        map(response => {
          const memberBasicInfo = Object.assign(new MemberBasicInfo(), response.body!);
          return memberBasicInfo;
        }),
        catchError(error => {
          return of(new MemberErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }
}


