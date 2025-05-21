import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, Observable, of} from 'rxjs';
import {EnumResponseModel} from '../models/enum.model';
import {ErrorResponseModel} from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EnumApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  constructor() {
  }

  public enumsByNames(names: string[]): Observable<EnumResponseModel | ErrorResponseModel> {
    let httpParams = new HttpParams();

    names.forEach((value: string) => {
      httpParams = httpParams.append('names', value)
    })

    return this._http.get<EnumResponseModel>(`${this._baseUrl}/enums/`, {observe: 'response', params: httpParams})
      .pipe(
        map(response => {
          return Object.assign(new EnumResponseModel(), response.body!);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({msg: error.error.msg, code: error.status}));
        }));
  }

}
