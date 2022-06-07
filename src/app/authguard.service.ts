import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ChildActivationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { filter, Observable, take } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable(
  
)
export class AuthguardService implements CanActivate{

  constructor(private activated: ActivatedRoute, private router : Router, private jwtHelper : JwtHelperService, public mat: MatDialog) { }

  canActivate(){
    const token = localStorage.getItem("jwt");

    let test = this.activated.snapshot;

    console.log('test log', test);

    let currentRout = window.location.href;
    console.log('current',currentRout);

    let url = this.activated.snapshot.url.join('');
    console.log('current url',url);

    console.log('parent',  this.activated.parent);
    console.log('children',  this.activated.children);

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.router.navigate(["/"]);
    this.mat.open(LoginComponent);
    return false;
  }

  //test() : boolean{

   // const token = localStorage.getItem("jwt");
   // const role = localStorage.getItem("role");

   // console.log('token', token);
   // console.log('role', role);

   // if(this.jwtHelper != null){
   //   console.log('expired', this.jwtHelper.isTokenExpired(token!));
   // }
   

   // if(token && !this.jwtHelper.isTokenExpired(token) && role == "Admin"){
     // return true;
   // }

    //this.router.navigate(["/"]);
   // return false;
  }
    
  
//}
