import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fu-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  constructor() { }

  isVisibleByRole : boolean = true;

  ngOnInit(): void {
    this.isVisibleByRole = localStorage.getItem("role") != null && localStorage.getItem("role") == "Admin" ? false : true;
  }

}
