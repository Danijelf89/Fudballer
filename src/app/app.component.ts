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

  constructor(private route : Router, public mat: MatDialog){}

  ngOnInit(): void {

  }

  openSettings(){
    this.mat.open(SettingsComponent);
  }

  logIn(){
    let dialog = this.mat.open(LoginComponent);
    dialog.afterClosed().subscribe(res=>{
     
     
       this.user = res.userName;
       if(this.user !== ''){
        this.showSignIn = false;
        this.showLogOut = true;
       } 
    })
  }
 
  logout(){
    localStorage.removeItem("jwt");
    this.route.navigate(["/"]);
    this.showSignIn = true;
    this.showLogOut = false;
  }
}
