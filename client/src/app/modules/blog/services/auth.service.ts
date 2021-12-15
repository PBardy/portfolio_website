import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../definitions';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new AuthState(null, false);
  private authStateSubject = new BehaviorSubject<AuthState>(this.authState);
  public authStateEvent = this.authStateSubject.asObservable();

  constructor(private api: ApiService) {
    this.getState();
  }

  private getState(): void {
    const state = localStorage.getItem('authState');
    if (state) {
      const json = JSON.parse(state);
      this.authState.signIn(json.user);
    }
  }

  private saveState(credentials: AuthState): void {
    localStorage.setItem('authState', JSON.stringify(credentials));
  }

  private clearState(): void {
    localStorage.removeItem('authState');
  }

  public signUp(credentials: User.SignUpCredentials) {
    return this.api.post<User.SignUpResponse>('auth/signup', credentials);
  }

  public signIn(credentials: User.SignInCredentials) {
    return this.api.post<User.SignInResponse>('auth/signin', credentials).pipe(
      tap((response) => {
        if (response.success) {
          this.authState.signIn(response.data.user);
          this.authStateSubject.next(this.authState);
          this.saveState(this.authState);
        }
      })
    );
  }

  public signOut(): void {
    this.clearState();
    this.authState.signOut();
    this.authStateSubject.next(this.authState);
  }
}

export class AuthState {
  public user: User.User | null;
  public signedIn: boolean;

  constructor(user: User.User | null, signedIn: boolean) {
    this.user = user;
    this.signedIn = signedIn;
  }

  public get signedOut(): boolean {
    return !this.signedIn;
  }

  public signIn(user: User.User): void {
    this.user = user;
    this.signedIn = true;
  }

  public signOut(): void {
    this.user = null;
    this.signedIn = false;
  }
}
