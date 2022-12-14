import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private CurrentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(vm: any){

    return this.http.post(this.baseUrl + 'account/login', vm).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    )
  }
  register(vm: any){

    return this.http.post(this.baseUrl + 'account/register', vm).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    this.CurrentUserSource.next(user);
  }


  logout(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
}
