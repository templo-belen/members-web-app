import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestModel } from '../models/api-request.model';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorResponseModel, LoginResponseModel } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { RoleResponseModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);
  private _baseUrl = environment.backendBaseUrl;

  public login(parameters: LoginRequestModel): Observable<LoginResponseModel | ErrorResponseModel> {
    const body = new URLSearchParams();
    body.set("username", parameters.username);
    body.set("password", parameters.password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post<LoginResponseModel>(`${this._baseUrl}/login`, body,
      {observe: "response", headers: headers}
    )
      .pipe(
        map(response => {
          const props: LoginResponseModel = {
            token: response.headers!.get('Authorization')!,
            fullName: response.body!.fullName,
            username: response.body!.username
          };
          return new LoginResponseModel(props);
        }),
        catchError(error => {
          return of(new ErrorResponseModel({msg: error.error.detail, code: error.status}));
        }));
  }

  public logout() {

    // TODO ???

  }

  public listRoles(): Observable<RoleResponseModel[] | ErrorResponseModel> {
    return this._http.get<RoleResponseModel[]>(`${this._baseUrl}/roles/`, {observe: "response"}).pipe(
      map(response => response.body!),
      catchError(error =>
        of(new ErrorResponseModel({msg: error.error.msg, code: error.status}))
      )
    );
  }
}
