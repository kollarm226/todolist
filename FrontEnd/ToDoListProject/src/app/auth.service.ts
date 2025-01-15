import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5186/api/auth';

  constructor(private http: HttpClient) {
  }

  register(user: { email: string; password: string; name: string }): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/register`, user, {responseType: 'text'}) // Explicitly expect a text response
      .pipe(
        map((response: string) => {
          console.log('Registration successful:', response);
          return response; // Return the success message
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          if (error.error instanceof ProgressEvent) {
            return throwError('Network error occurred. Please try again.');
          }
          if (typeof error.error === 'string') {
            return throwError(error.error);
          }
          return throwError('An unexpected error occurred.');
        })
      );
  }


  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
