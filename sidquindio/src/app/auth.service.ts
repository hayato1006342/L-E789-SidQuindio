import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken())
  isAdmin = new BehaviorSubject<boolean>(this.checkAdmin())
  
  rank:number

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  private checkAdmin(): boolean{
    return !!localStorage.getItem('rango')
  }

  setRangertUser(user:string) : void {
    localStorage.setItem('rango', user);
  }

  confirmarRango(): void{
    this.rank = Number(localStorage.getItem('rango'))
    if (this.rank == 2){
      this.isAdmin.next(true);
    }else{
      this.isAdmin.next(false);
    }
  }

  isAdmins() : Observable<boolean> {
    return this.isAdmin.asObservable();
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
    localStorage.removeItem('rango')
    this.deleteCourrentUser();
    this.isLogin.next(false);
    this.isAdmin.next(false);
  }
  constructor() { }
}
