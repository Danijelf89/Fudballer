import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Club } from '../club';

@Component({
  selector: 'fu-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  selectedClub = this.data;
}
