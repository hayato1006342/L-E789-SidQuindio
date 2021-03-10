import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DetallesGuard implements CanActivate {

  constructor( public auth : AuthService, private route: Router ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {

      this.auth.isLoggedIn().subscribe(
        login => {
        if (login) {
          resolve(true);
        } else {
          this.route.navigate(['/login']);
          resolve(false);
        }
      });
    });
      
  }  
  
}
