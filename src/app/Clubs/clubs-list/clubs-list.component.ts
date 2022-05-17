import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { SpinnerComponentComponent } from 'src/app/shared/spinner-component/spinner-component.component';
import { AddUpdateClubComponent } from '../add-update-club/add-update-club.component';
import { Club } from '../club';
import { ClubDetailsComponent } from '../club-details/club-details.component';

@Component({
  selector: 'fu-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css']
})
export class ClubsListComponent implements OnInit {

  constructor(public service: FootballersService, private dialogRef: MatDialog) { }

  clubs: Observable<Club[]> = new Observable;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {

    this.getClubs();
  }

  delete(item: Club) {
    let di = this.dialogRef.open(DeleteComponent, { data: { item, name: 'club' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getClubs();
    });
  }

  openDetails(item: Club) {
    this.dialogRef.open(ClubDetailsComponent, { data: item, width: '500px' });
  }

  updateClub(item: Club) {
    let di = this.dialogRef.open(AddUpdateClubComponent, { data: { club: item, operation: 'Update' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getClubs();
    });
  }

  addClub() {
    let di = this.dialogRef.open(AddUpdateClubComponent, { data: { operation: 'Add' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getClubs();
    });
  }

  getClubs(){
    let dialog =  this.dialogRef.open(SpinnerComponentComponent, {disableClose : true});
    this.clubs = this.service.getClubs();
    dialog.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
