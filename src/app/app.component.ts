import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'fu-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  showSignIn : boolean = true;
  showLogOut : boolean = true;

  user : string = '';
  role : string = '';
  showLogin : boolean = false;
  message : string = '';

  constructor(private route : Router, public mat: MatDialog){}

  ngOnInit(): void {

    this.showLogOut = localStorage.getItem("jwt") ? true : false;
    this.showSignIn = localStorage.getItem("jwt") ? false : true;

    let user = localStorage.getItem("userName");
     
       this.user = user!;

       let role = localStorage.getItem("role");
     
       this.role = role != null ? role : '';

       this.showLogin =false;

       console.log('show login', this.showLogin)

       this.message = this.user != null ? 'User: ' + this.user +' '+ 'Role: '+this.role : 'LogIn';

  }

  openSettings(){
    this.mat.open(SettingsComponent);
  }

  logIn(){
    let dialog = this.mat.open(LoginComponent);
    dialog.afterClosed().subscribe(res=>{
     
      let user = localStorage.getItem("userName");
     
       this.user = user != null ? user : '';

       let role = localStorage.getItem("role");
     
       this.role = role != null ? role : '';
       
        this.showLogOut = localStorage.getItem("jwt") ? true : false;
        this.showSignIn = localStorage.getItem("jwt") ? false : true;

        this.message = this.user != '' ? 'User: ' + this.user +' '+ 'Role: '+this.role : 'LogIn';
      
    })
  }
 
  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    this.user = '';
    this.role = '';
    this.route.navigate(["/"]);
    this.showLogOut = localStorage.getItem("jwt") ? true : false;
    this.showSignIn = localStorage.getItem("jwt") ? false : true;
    this.showLogin =false;

    this.message = 'LogIn';
  }
}
