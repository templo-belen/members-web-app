import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginRequestModel} from '../models/api-request.model';
import {LOGIN_URI} from '../../app-constants';
import {catchError, map, Observable, of, onErrorResumeNext} from 'rxjs';
import {mapOneOrManyArgs} from 'rxjs/internal/util/mapOneOrManyArgs';
import {LoginError, UserModel} from '../models/user.model';
import {LoginErrorResponseModel, LoginResponseModel} from '../models/api-response.model';
import {LoginComponent} from '../../shared/components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);

  constructor() {
  }

  public login(parameters: LoginRequestModel): Observable<LoginResponseModel | LoginErrorResponseModel> {
    console.log(`login url: ${LOGIN_URI}`);
    return this._http.post<LoginResponseModel>('http://localhost:3002/login', parameters, {observe: "response"})
      .pipe(
        map(response => {
          console.log(`response: ${response.body}`);
          return new LoginResponseModel(response.body!);
        }),
        catchError(error => {
          console.error(`no existe el endpoint: ${JSON.stringify(error)}`);
          return of(new LoginErrorResponseModel({msg: error.msg, code: error.code}));
        })
      );
  }

  public logout() {

  }
}
