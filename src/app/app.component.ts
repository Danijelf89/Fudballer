import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'fu-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private route : Router, public mat: MatDialog,){}

  ngOnInit(): void {

    this.route.navigate(['welcomePage'])
  }

  openSettings(){
    this.mat.open(SettingsComponent);
  }
 
}
