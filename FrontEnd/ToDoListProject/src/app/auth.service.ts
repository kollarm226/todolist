import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5186/api/auth';

  constructor(private http: HttpClient) {
  }

  register(user: { email: string; password: string; name: string }): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/register`, user, {responseType: 'text'})
      .pipe(
        map((response: string) => response),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(error.error || 'An unexpected error occurred.');
        })
      );
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log(localStorage.getItem('user'));


        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error.error || 'An unexpected error occurred.');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserId(): string | null {
    const user = this.getLoggedInUser();
    return user ? user.id : null;
  }

}
