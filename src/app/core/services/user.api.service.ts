import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequestModel} from '../models/api-request.model';
import {LOGIN_URI} from '../../app-constants';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {LoginErrorResponseModel, LoginResponseModel} from '../models/api-response.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);
  private _router = inject(Router);

  constructor() {
  }

  public login(parameters: LoginRequestModel): Observable<LoginResponseModel | LoginErrorResponseModel> {
    return this._http.post<LoginResponseModel>('http://localhost:3002/login', parameters, {observe: "response"})
      .pipe(
        map(response => {
          return new LoginResponseModel(response.body!);
        }),
        catchError(error => {
          return of(new LoginErrorResponseModel({msg: error.error.msg, code: error.status}));
        })
      )
      ;
  }

  public logout() {

  }
}
