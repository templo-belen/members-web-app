import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MemberErrorResponseModel, MemberListResponseModel } from '../models/api-response.model';
import { MemberBasicInfo } from '../models/member.model';
import { MemberReference } from '../models/member-reference-model';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | MemberErrorResponseModel> {
    return this._http.get<MemberBasicInfo[]>(`${this._baseUrl}/members`, { observe: "response" })
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
          return new MemberBasicInfo(response.body!);
        }),
        catchError(error => {
          return of(new MemberErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }
  public referencesById(memberId: number): Observable<MemberReference | MemberErrorResponseModel> {
    return this._http.get<MemberReference>(`http://localhost:8000/members/${memberId}/references`, { observe: "response" })
      .pipe(
        map(response => {
          return new MemberReference(response.body!);
        }),
        catchError(error => {
          return of(new MemberErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }
}


