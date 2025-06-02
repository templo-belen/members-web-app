import {inject, Injectable} from '@angular/core';
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
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {

  private _apiService = inject(ApiService);
  private _baseUrl = environment.backendBaseUrl;
  private _membersAPIUrl = `${this._baseUrl}/members`;

  constructor() {
  }

  public list(): Observable<MemberListResponseModel | ErrorResponseModel> {
    return this._apiService.sendAuthenticatedGet<MemberListItem[]>(`${this._membersAPIUrl}`)
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
    return this._apiService.sendAuthenticatedGet<MemberBasicInfo>(`${this._membersAPIUrl}/${memberId}`)
      .pipe(
        map(response => {
          return Object.assign(new MemberBasicInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public createBasicInfo(body: MemberBasicInfo): Observable<MemberBasicInfo | ErrorResponseModel> {
    return this._apiService.sendAuthenticatedPost<MemberBasicInfo>(`${this._baseUrl}/members`, body)
      .pipe(
        map(response => {
          return Object.assign(new MemberBasicInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({msg: error.error.detail, code: error.status}));
        }));
  }

  public referencesById(memberId: number): Observable<MemberReferences | ErrorResponseModel> {
    return this._apiService.sendAuthenticatedGet<MemberReferences>(`${this._membersAPIUrl}/${memberId}/references`)
      .pipe(
        map(response => {
          return Object.assign(new MemberReferences(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public generalInfoById(memberId: number): Observable<MemberGeneralInfo | ErrorResponseModel> {
    return this._apiService.sendAuthenticatedGet<MemberGeneralInfo>(`${this._membersAPIUrl}/${memberId}/general-data`)
      .pipe(
        map(response => {
          return Object.assign(new MemberGeneralInfo(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

  public dewInfoById(memberId: number): Observable<MemberDewInfo | ErrorResponseModel> {
    return this._apiService.sendAuthenticatedGet<MemberDewInfoResponseModel>(`${this._membersAPIUrl}/${memberId}/dew`)
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
    return this._apiService.sendAuthenticatedGet<MemberFormValues>(`${this._membersAPIUrl}/init-form`)
      .pipe(
        map(response => {
          return Object.assign(new MemberFormValues(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({ msg: error.error.msg, code: error.status }));
        }));
  }

}


