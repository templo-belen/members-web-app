import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {ErrorResponseModel, MemberListResponseModel} from '../models/api-response.model';
import {MemberBasicInfo, MemberFormValues, MemberInformation, MemberListItem} from '../models/member.model';
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

  public getMemberById(memberId: number): Observable<MemberInformation | ErrorResponseModel> {
    return this._http.get<MemberInformation>(`${this._membersAPIUrl}/${memberId}`, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberInformation(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public createBasicInfo(body: MemberBasicInfo): Observable<MemberBasicInfo | ErrorResponseModel> {
    return this._http.post<MemberBasicInfo>(`${this._baseUrl}/members`, body, { observe: "response" })
      .pipe(
        map(response => {
          return Object.assign(new MemberBasicInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({msg: error.error.detail, code: error.status}));
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


