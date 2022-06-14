import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt'
import { LoginComponent } from './login/login.component';

@Injectable(

    )
export class Authguardadmin implements CanActivate{
    constructor(private activated: ActivatedRoute, private router: Router, private jwtHelper: JwtHelperService, public mat: MatDialog) { }

    canActivate() {
      const token = localStorage.getItem("jwt");
      const role = localStorage.getItem("role");
  
      if (token && this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        this.router.navigate(["/"]);
       
        return false;
      }

      else if(role !== "Admin"){
        this.router.navigate(["welcomePage"]);
      }
  
     
      return true;
    }
  }
  
  
  
  
