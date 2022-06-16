import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Languagesmodel } from './languagesmodel';


const homeUrl = 'http://localhost:4200/';

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
  selectedlanguage: any;
  contentDropdown: boolean = false;

  selectedLanguagesrc: string = '';
  selectedLangAlt: string = '';

  languages: Languagesmodel[] = [{
    src: '../assets/eng.png',
    alt: "img1",
    lang: 'en',
  },
  {
    src: '../assets/flag-round-250-serbia.png',
    alt: "img2",
    lang: 'sr',
  }]


  constructor(private route: Router, private toastr: ToastrService, public mat: MatDialog, public translate: TranslateService, private snack: MatSnackBar) {

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|sr/) ? browserLang : 'en');
  }

  ngOnInit(): void {

    if (localStorage.getItem("jwt") && window.location.href === homeUrl) {
      this.route.navigate(['welcomePage']);
    }

    if (localStorage.getItem('language') === '') {
      localStorage.setItem("language", "en");
      var index = this.languages.findIndex(x => x.lang === localStorage.getItem('language'));
      this.selectedlanguage = this.languages[index];
      //this.selectedLanguagesrc = this.languages[index].src;
      //this.selectedLangAlt = this.languages[index].alt;
      this.translate.use(localStorage.getItem('language')!).subscribe(() => {
        this.refrehMessage();
      });
    }

    else {
      var index = this.languages.findIndex(x => x.lang === localStorage.getItem('language'));
      this.selectedlanguage = this.languages[index];
      //this.selectedLanguagesrc = this.languages[index].src;
      //this.selectedLangAlt = this.languages[index].alt;
      
      this.translate.use(localStorage.getItem('language')!).subscribe(() => {
        this.refrehMessage();
      });
    }

    this.hideLogOut = localStorage.getItem("jwt") ? false : true;
    this.hideSignIn = localStorage.getItem("jwt") ? true : false;

    this.refreshData();

    this.translate.get('HOME.Settings').subscribe((text: string) => {
      this.refrehMessage();
    });
  }

  

  changeLanguage(lang: Languagesmodel) {
   this.selectedlanguage = lang;

    this.translate.use(lang.lang).subscribe(() => {
      this.refrehMessage();
      localStorage.setItem("language", lang.lang);
    });

    this.contentDropdown = false;
    console.log('selektovan lang', this.selectedlanguage);
  }

  openSettings() {
    this.mat.open(SettingsComponent);
  }

  logIn() {
    if (localStorage.getItem("jwt")) {
      this.refreshData();
      this.hideLogOut = localStorage.getItem("jwt") ? false : true;
      this.hideSignIn = localStorage.getItem("jwt") ? true : false;

      this.toastr.info('User is already loged in', 'Info');

      this.refrehMessage();
      this.route.navigate(['welcomePage']);

      return;
    }


    let dialog = this.mat.open(LoginComponent, { disableClose: true });
    dialog.afterClosed().subscribe(res => {
      if (!res.success) {
        return;
      }

      this.refreshData();
      this.hideLogOut = false;
      this.hideSignIn = true;

      this.toastr.success(this.name + " " + this.surname, 'Welcome');

      this.refrehMessage();

    })
  }

  dropDownLang() {
    this.contentDropdown = true;
  }

  refreshData() {
    this.name = localStorage.getItem("name")!;
    this.surname = localStorage.getItem("surname")!;
    this.role = localStorage.getItem("role")!;
  }

  refrehMessage() {
    this.message = this.name != null && this.name != '' ? this.translate.instant('HOME.User') + this.name + ' ' + ' ' + this.surname + ' ' + this.translate.instant('HOME.Role') + this.role : this.translate.instant('HOME.LogInToContinue');
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("role");

    this.toastr.success('Goodbye');

    this.name = '';
    this.surname = '';
    this.role = '';
    this.route.navigate(["/"]);
    this.hideLogOut = true;
    this.hideSignIn = false;

    this.refrehMessage();
  }
}
