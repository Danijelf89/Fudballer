import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ChildActivationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { LoginComponent } from './login/login.component';

@Injectable(

)
export class AuthguardService implements CanActivate {

  constructor(private activated: ActivatedRoute, private router: Router, private jwtHelper: JwtHelperService, public mat: MatDialog) { }

  canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    this.router.navigate(["/"]);
    this.mat.open(LoginComponent);
    return false;
  }
}



