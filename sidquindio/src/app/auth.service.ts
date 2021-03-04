import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken())

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }


  setCourrentUser(user:string) : void {
    localStorage.setItem('courrentUser', user);
  }


  getCourrentUser() : string {
    return localStorage.getItem('courrentUser');
  }

  login(token:string) : void {

    localStorage.setItem('token', token);
    this.isLogin.next(true);

  }

  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }

  private deleteCourrentUser() : void {
    localStorage.removeItem('courrentUser');
  }

  logout() : void {
    localStorage.removeItem('token');
    this.deleteCourrentUser();
    this.isLogin.next(false);
  }
  constructor() { }
}
