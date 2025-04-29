import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  public registerUser(): Observable<any> {
    return of();
  }

  public isAuthenticated(): boolean {
    // Logica para determinar si esta autenticado
    return false;
  }
}
