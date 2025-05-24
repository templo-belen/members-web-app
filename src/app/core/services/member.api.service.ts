import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {ErrorResponseModel, MemberDewInfoResponseModel, MemberListResponseModel} from '../models/api-response.model';
import {
  MemberBasicInfo,
  MemberDewInfo,
  MemberFormValues,
  MemberGeneralInfo,
  MemberListItem,
  MemberReferences
} from '../models/member.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;
  private _membersAPIUrl = `${this._baseUrl}/members`;

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | ErrorResponseModel> {
    return this._http.get<MemberListItem[]>(`${this._membersAPIUrl}`, { observe: "response" })
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
    return this._http.get<MemberBasicInfo>(`${this._membersAPIUrl}/${memberId}`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberBasicInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public referencesById(memberId: number): Observable<MemberReferences | ErrorResponseModel> {
    return this._http.get<MemberReferences>(`${this._membersAPIUrl}/${memberId}/references`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberReferences(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public generalInfoById(memberId: number): Observable<MemberGeneralInfo | ErrorResponseModel> {
    return this._http.get<MemberGeneralInfo>(`${this._membersAPIUrl}/${memberId}/general-data`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberGeneralInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public dewInfoById(memberId: number): Observable<MemberDewInfo | ErrorResponseModel> {
    return this._http.get<MemberDewInfoResponseModel>(`${this._membersAPIUrl}/${memberId}/dew`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberDewInfo(), {
            ...response.body!,
            ministrationDate: response.body!.ministrationDate ? new Date(response.body!.ministrationDate) : null
          });
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public memberFormValues(): Observable<MemberFormValues | ErrorResponseModel> {
    return this._http.get<MemberFormValues>(`${this._membersAPIUrl}/init-form`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberFormValues(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

}


