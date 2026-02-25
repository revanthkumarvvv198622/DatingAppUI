import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User, UserLogin, UserRegister } from '../types/User';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //used to manage states and used as application singleton for user data and authentication
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  currentUser: WritableSignal<User | null> = signal(null);

  login(creds: UserLogin) {
    return this.httpClient.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
              if(user){
                this.setCurrentUser(user);
              }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  register(creds: UserRegister){
     return this.httpClient.post<User>(this.baseUrl + 'account/register', creds).pipe(tap(user=>{
        if(user){
          this.setCurrentUser(user);
        }
      }))
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  currentUserLogged() : boolean {
    return !!this.currentUser();
  }

}
