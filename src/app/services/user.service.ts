import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIbUser$ = new BehaviorSubject<IUser | null>(null);
  // public user$ = this.loggedIbUser$.asObservable();
  constructor() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.loggedIbUser$.next(user);
  }

  setCurrentUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIbUser$.next(user);
  }

  removeCurrentUser() {
    localStorage.removeItem('user');
    this.loggedIbUser$.next(null);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
