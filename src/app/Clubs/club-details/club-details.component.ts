import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFootballers } from 'src/app/Footballers/footballers.model';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { Base } from 'src/app/shared/base';
import { Club } from '../club';

@Component({
  selector: 'fu-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent extends Base implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public mat: MatDialog, public snack: MatSnackBar) {
    super(mat, snack);

    this.displayedColumnsBase = ['name', 'surname', 'rating', 'picture'];
  }

  listOfFootballers: IFootballers[] = [];

  ngOnInit(): void {
    this.dataSourceBase.data =  this.data;
    this.dataSourceBase.paginator = this.paginator;
    this.listOfFootballers = this.data;
  }
  
}
