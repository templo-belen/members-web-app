import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);

  public sendAuthenticatedGet<T>(url: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this._http.get<T>(url, { params: params, headers: this.getHeaders(), observe: 'response' });
  }

  public sendAuthenticatedPost<T>(url: string, body: any): Observable<HttpResponse<T>> {
    return this._http.post<T>(url, body, { headers: this.getHeaders(), observe: 'response' });
  }

  public sendAuthenticatedPut<T>(url: string, body: any): Observable<HttpResponse<T>> {
    return this._http.put<T>(url, body, { headers: this.getHeaders(), observe: 'response' });
  }

  private getHeaders() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}
