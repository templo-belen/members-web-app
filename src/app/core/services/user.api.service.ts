import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequestModel} from '../models/api-request.model';
import {LOGIN_URI} from '../../app-constants';
import {catchError, map, Observable, of} from 'rxjs';
import {LoginErrorResponseModel, LoginResponseModel} from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);

  constructor() {
  }

  public login(parameters: LoginRequestModel): Observable<LoginResponseModel | LoginErrorResponseModel> {
    return this._http.post<LoginResponseModel>('http://localhost:3002/login', parameters, {observe: "response"})
      .pipe(
        map(response => {
          return new LoginResponseModel(response.body!);
        }),
        catchError(error => {
          return of(new LoginErrorResponseModel({msg: error.msg, code: error.code}));
        })
      );
  }

  public logout() {

  }
}
