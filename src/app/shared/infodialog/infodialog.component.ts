import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fu-infodialog',
  templateUrl: './infodialog.component.html',
  styleUrls: ['./infodialog.component.css']
})
export class InfodialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  message: string = "";

  ngOnInit(): void {
    this.message = this.data.name;
  }

}
