import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './responseInterface';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  // currentUserSource = new ReplaySubject<User>(1);
  // currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(environment.loginUrl,
      {
        username: username,
        password: password
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.username, resData.email, resData.sessionToken, resData.objectId);
        })
      );
  };

  autoLogin() {
    const u: User = JSON.parse(localStorage.getItem('userData') || '{}');
    if (Object.keys(u).length !== 0) {
      const user = new User(u.username, u.email, u._token, u.id);
      this.user.next(user);
    }
  };

  logOut() {
    return this.http.post(environment.logOut, {})
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.user.next(null);
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
        })
      );
  };

  private handleAuthentication(username: string, email: string, sessionToken: string, objectId: string) {
    const user = new User(username, email, sessionToken, objectId);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  };

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // if (!errorRes.error || !errorRes.error.error) {
    if (errorRes.error.message !== 'Invalid username/password.') {
      return throwError(errorMessage);
    } else {
      return throwError(errorRes.error.message);
    }
  };
}
