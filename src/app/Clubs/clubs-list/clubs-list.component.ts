import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { Base } from 'src/app/shared/base';
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
export class ClubsListComponent extends Base implements OnInit {

  constructor(public service: FootballersService, public mat: MatDialog, public snack: MatSnackBar) {
    super(mat, snack);
  }

  clubs: Club[] = [];
  subscriptions: Subscription = new Subscription;

  ngOnInit(): void {

    this.getClubs();
  }

  deleteClub(item: Club) {
    let di = this.dialog.open(DeleteComponent, { data: { message: 'Are you sure you want do delete this club?', name: item.clubName }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (res.result === true) {
        this.clubs = super.delete(this.service.deleteClub(item.id), this.clubs, item.id);
      }
    });
  }

  openDetails(item: Club) {
    this.dialog.open(ClubDetailsComponent, { data: item, width: '500px' });
  }

  updateClub(item: Club) {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: item, operation: 'Update club' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.clubs = super.update(this.service.updateClub(res.item), this.clubs, res.item);
      }
    });
  }

  addClub() {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: {}, operation: 'Add new club' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.clubs = super.add(this.service.addNewClub(res.item), this.clubs, res.item);
      }
    });
  }

  getClubs() {
    let dialog = this.dialog.open(SpinnerComponentComponent, { disableClose: true });
    this.service.getClubs().subscribe(res => {
      this.clubs = res;
    }).unsubscribe;
    dialog.close();
  }
}
