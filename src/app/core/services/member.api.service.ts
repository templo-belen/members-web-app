import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MemberDewInfoResponseModel, ErrorResponseModel, MemberListResponseModel } from '../models/api-response.model';
import { MemberBasicInfo, MemberDewInfo, MemberGeneralInfo, MemberListItem, MemberReferences } from '../models/member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | ErrorResponseModel> {
    return this._http.get<MemberListItem[]>(`${this._baseUrl}/members`, { observe: "response" })
      .pipe(
        map(response => {
          return new MemberListResponseModel({ memberList: response.body! });
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        })
      );
  }

  public basicInfoById(memberId: number): Observable<MemberBasicInfo | ErrorResponseModel> {
    return this._http.get<MemberBasicInfo>(`${this._baseUrl}/members/${memberId}`, { observe: "response" })
      .pipe(
        map(response => {
          const memberBasicInfo = Object.assign(new MemberBasicInfo(), response.body!);
          return memberBasicInfo;
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public referencesById(memberId: number): Observable<MemberReferences | ErrorResponseModel> {
    return this._http.get<MemberReferences>(`${this._baseUrl}/members/${memberId}/references`, { observe: "response" })
      .pipe(
        map(response => {
          const memberReferences = Object.assign(new MemberReferences(), response.body!);
          return memberReferences;
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public generalInfoById(memberId: number): Observable<MemberGeneralInfo | ErrorResponseModel> {
    return this._http.get<MemberGeneralInfo>(`${this._baseUrl}/members/${memberId}/general-data`, { observe: "response" })
      .pipe(
        map(response => {
          const memberGeneralInfo = Object.assign(new MemberGeneralInfo(), response.body!);
          return memberGeneralInfo;
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public dewInfoById(memberId: number): Observable<MemberDewInfo | ErrorResponseModel> {
    return this._http.get<MemberDewInfoResponseModel>(`${this._baseUrl}/members/${memberId}/dew`, { observe: "response" })
      .pipe(
        map(response => {
          const memberDewInfo = Object.assign(new MemberDewInfo(), { ...response.body!, ministrationDate: response.body!.ministrationDate ? new Date(response.body!.ministrationDate) : null });
          console.log(memberDewInfo.ministrationDate);
          console.log(typeof memberDewInfo.ministrationDate);
          return memberDewInfo;
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }
}


