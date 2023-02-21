import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user-interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  backendUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  register(user: IUser | null) {
    return this.httpClient.post<IUser>(this.backendUrl, user);
  }

  login(user: IUser) {
    return this.getUserByEmail(user.email).pipe(
      map((userFromBackend) => {
        if (userFromBackend === null) {
          return null;
        }
        if (user.password === userFromBackend.password) {
          return user;
        }
        return null;
      })
    );
  }

  private getUserByEmail(email: string): Observable<IUser | null> {
    return this.httpClient
      .get<IUser[]>(this.backendUrl + '?email=' + email)
      .pipe(map((res) => res[0] || null));
  }
}
