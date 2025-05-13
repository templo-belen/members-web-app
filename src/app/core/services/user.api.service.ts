import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from '../models/api-request.model';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginErrorResponseModel, LoginResponseModel } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  constructor() {
  }

  public login(parameters: LoginRequestModel): Observable<LoginResponseModel | LoginErrorResponseModel> {
    return this._http.post<LoginResponseModel>(`${this._baseUrl}/login`, parameters, { observe: "response" })
      .pipe(
        map(response => {
          return new LoginResponseModel(response.body!);
        }),
        catchError(error => {
          return of(new LoginErrorResponseModel({ msg: error.error.msg, code: error.status }));
        })
      )
      ;
  }

  public logout() {

  }
}
