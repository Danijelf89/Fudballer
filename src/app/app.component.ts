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
export class AppComponent implements OnInit {

  hideSignIn: boolean = true;
  hideLogOut: boolean = true;
  name: string = '';
  surname: string = '';
  role: string = '';
  message: string = '';

  constructor(private route: Router, public mat: MatDialog, public translate: TranslateService) {

    translate.addLangs(['en', 'sr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|sr/) ? browserLang : 'en');
  }

  ngOnInit(): void {

    this.hideLogOut = localStorage.getItem("jwt") ? false : true;
    this.hideSignIn = localStorage.getItem("jwt") ? true : false;

    this.name = localStorage.getItem("name")! != null ? localStorage.getItem("name")! : "";
    this.surname = localStorage.getItem("surname")! != null ? localStorage.getItem("surname")! : ""
    this.role = localStorage.getItem("role")! != null ? localStorage.getItem("role")! : "";

    this.translate.get('HOME.Settings').subscribe((text: string) => {
      this.refrehMessage();
    });
  }

  onLanguageChanged(event : any) {
    this.translate.use(event.value).subscribe(() => {
      this.refrehMessage();
    });
  }

  openSettings() {
    this.mat.open(SettingsComponent);
  }

  logIn() {
    let dialog = this.mat.open(LoginComponent);
    dialog.afterClosed().subscribe(() => {
      this.name = localStorage.getItem("name")!;
      this.surname = localStorage.getItem("surname")!;
      this.role = localStorage.getItem("role")!;
      this.hideLogOut = false;
      this.hideSignIn = true;

      this.refrehMessage();
    })
  }

  refrehMessage() {
    this.message = this.name != null && this.name != '' ? this.translate.instant('HOME.User') + this.name + ' ' + ' ' + this.surname + ' ' + this.translate.instant('HOME.Role') + this.role : this.translate.instant('HOME.LogInToContinue');
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("role");
    this.name = '';
    this.surname = '';
    this.role = '';
    this.route.navigate(["/"]);
    this.hideLogOut = true;
    this.hideSignIn = false;

    this.refrehMessage();
  }
}
