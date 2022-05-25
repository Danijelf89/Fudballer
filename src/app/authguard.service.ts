import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable(
  
)
export class AuthguardService implements CanActivate{

  constructor(private router : Router, private jwtHelper : JwtHelperService, public mat: MatDialog) { }

  canActivate(){
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(["/"]);
    this.mat.open(LoginComponent);
    return false;
  }
    
  
}
