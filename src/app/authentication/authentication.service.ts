import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/authentication/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user = new BehaviorSubject<User>(<User>{});

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username && password) {
      this.user.next({ username: username, name: username });
      return of(true);
    }
    return of(false);
  }
}
