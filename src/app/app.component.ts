import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { TranslateService } from '@ngx-translate/core'
import { extend } from 'hammerjs';
import { Base } from './shared/base';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fu-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent extends Base implements OnInit, OnChanges {

  showSignIn: boolean = true;
  showLogOut: boolean = true;

  name: string = '';
  surname: string = '';
  role: string = '';
  showLogin: boolean = false;
  message: string = '';



  constructor(private snack : MatSnackBar, private route: Router, public mat: MatDialog, public translate: TranslateService)  {
    super(mat, snack);

    translate.addLangs(['en', 'sr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|sr/) ? browserLang : 'en');





    console.log('called con');
  }

 
  settingsTooltip: string = '';
  languagePlaceholder : string = '';

  isVisibleByRole: boolean = true;

  ngOnChanges() {
    console.log('on changes called');
  }

  ngOnInit(): void {

    this.showLogOut = localStorage.getItem("jwt") ? true : false;
    this.showSignIn = localStorage.getItem("jwt") ? false : true;

    this.name = localStorage.getItem("name")!;
    this.surname = localStorage.getItem("surname")!;

    //this.user = user!;

    let role = localStorage.getItem("role");

    this.role = role != null ? role : '';

    this.showLogin = false;

    this.translate.get('HOME.Settings').subscribe((text: string) => {
      this.settingsTooltip = text;
      this.languagePlaceholder = this.translate.instant('HOME.Language');
      this.refrehMessage();
    });

    this.isVisibleByRole = localStorage.getItem("name") != null && localStorage.getItem("name") != "" ? false : true;
  }

  onLanguageChanged(langselect: any) {
    this.translate.use(langselect).subscribe(res => {
      this.refrehMessage();
    });
  }

  openSettings() {
    this.mat.open(SettingsComponent);
  }

  logIn() {
    let dialog = this.mat.open(LoginComponent);
    dialog.afterClosed().subscribe(res => {

     this.name = localStorage.getItem("name")!;

    this.surname = localStorage.getItem("surname")!;

     

      let role = localStorage.getItem("role");

      this.role = role != null ? role : '';

      this.showLogOut = localStorage.getItem("jwt") ? true : false;
      this.showSignIn = localStorage.getItem("jwt") ? false : true;

      this.refrehMessage();

      this.isVisibleByRole = localStorage.getItem("name") != null && localStorage.getItem("name") != "" ? false : true;

    })
  }

  refrehMessage() {
    this.message = this.name != null && this.name != '' ? this.translate.instant('HOME.User') + this.name + ' ' + ' ' + this.surname + ' ' + this.translate.instant('HOME.Role') + this.role : this.translate.instant('HOME.LogInToContinue');
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    this.name = '';
    this.surname = '';
    this.role = '';
    this.route.navigate(["/"]);
    this.showLogOut = localStorage.getItem("jwt") ? true : false;
    this.showSignIn = localStorage.getItem("jwt") ? false : true;
    this.showLogin = false;

    this.refrehMessage();

    this.isVisibleByRole = localStorage.getItem("userName") != null && localStorage.getItem("userName") != "" ? false : true;
  }
}
