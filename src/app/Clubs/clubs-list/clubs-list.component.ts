import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private changeDetectorRefs: ChangeDetectorRef, public service: FootballersService, public mat: MatDialog, public snack: MatSnackBar) {
    super(mat, snack);

    this.displayedColumnsBase = ['clubName', 'city', 'budget', 'founded', 'owner', 'actions'];
  }

  
  clickedRows = new Set<Club>();

  clubs: Club[] = [];
  subscriptions: Subscription = new Subscription;
  selectedClub = {} as Club;
  
  ngOnInit(): void {

    this.getClubs();
  }

  ngAfterViewInit(){
    this.dataSourceBase.paginator = this.paginator;
  }
  
  deleteClub(item: Club) {
    let dialogRef = this.mat.open(DeleteComponent, { data: { message: 'Are you sure you want do delete this club?', name: item.clubName }, width: '500px', disableClose: true });
    dialogRef.afterClosed().subscribe((res : boolean) => {
      if (res === true) {
        super.delete(this.service.deleteClub(item.id), this.clubs, item.id); 
      }
    });
  }

  openDetails(item: Club) {
    this.mat.open(ClubDetailsComponent, { data: item, width: '500px' });
  }

  updateClub(item : any) {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: item, operation: 'Update club' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.update(this.service.updateClub(res.item), this.clubs, res.item);

      
      }
    });
  }

  

  addClub() {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: {}, operation: 'Add new club' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {

      console.log('ovo je dobio od testa', Object.keys(res.item).length);
      if (Object.keys(res.item).length !== 0) {
       
       

        this.add(this.service.addNewClub(res.item), this.clubs, res.item);

        
        

          console.log('moja ob', res);
          //this.dataSource.data.push(res.item);
        
         // this.changeDetectorRefs.detectChanges();
  
         // this.dataSource = new MatTableDataSource(this.clubs);

      }
    });
  }

  onclickedRow(item :Club){
    console.log(item);
    this.selectedClub = item;
  }

  getClubs() {
    //this.dialogRef = this.dialog.open(SpinnerComponentComponent, { disableClose: true });

    let spinnDialog = this.startSpinner();
    this.subscriptions = this.service.getClubs().subscribe(res => {
      this.clubs = res;

      this.sortListByDate(this.clubs);
      this.dataSourceBase.data = this.clubs;

     
    });
   this.closeSpinner(spinnDialog);
  }

ngOnDestroy(){
 // this.subscriptions.unsubscribe;
}
}
