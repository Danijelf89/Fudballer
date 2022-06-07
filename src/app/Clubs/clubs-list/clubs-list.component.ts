import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { IFootballers } from 'src/app/Footballers/footballers.model';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { Base } from 'src/app/shared/base';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { SpinnerComponentComponent } from 'src/app/shared/spinner-component/spinner-component.component';
import { environment } from 'src/environments/environment';
import { AddUpdateClubComponent } from '../add-update-club/add-update-club.component';
import { Club } from '../club';
import { ClubDetailsComponent } from '../club-details/club-details.component';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'fu-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClubsListComponent extends Base implements OnInit {

  constructor(private changeDetectorRefs: ChangeDetectorRef, public service: FootballersService, public mat: MatDialog, 
    public snack: MatSnackBar, public translate: TranslateService ) {
    super(mat, snack);

    this.displayedColumnsBase = ['clubName', 'city', 'budget', 'founded', 'owner', 'actions'];
  }

  @ViewChild(MatSort) sort! : MatSort;
  clickedRows = new Set<Club>();

  clubs: Club[] = [];
  subscriptions: Subscription = new Subscription;
  selectedClub = {} as Club;

  expandedElement = {} as Club;

  listOfFootballers : IFootballers[] = [];

  isVisibleByRole : boolean = true;
  
  ngOnInit(): void {

    this.getClubs();
    this.isVisibleByRole = localStorage.getItem("role") != null && localStorage.getItem("role") == "Admin" ? false : true;
  }

  ngAfterViewInit(){
    this.dataSourceBase.paginator = this.paginator;
    
    this.dataSourceBase.sort = this.sort;

   
  }
  
  deleteClub(item: Club) {
    let dialogRef = this.mat.open(DeleteComponent, { data: { message: this.translate.instant('HOME.DeleteClub'), name: item.clubName }, width: '500px', disableClose: true });
    dialogRef.afterClosed().subscribe((res : boolean) => {
      if (res === true) {
        super.delete(this.service.deleteClub(item.id), this.clubs, item.id); 
      }
    });
  }

  openListOfFootballers(item: Club) {

    this.service.getClubsFootballers(item.id).subscribe(res =>{
      this.listOfFootballers = res;
      this.mat.open(ClubDetailsComponent, { data: this.listOfFootballers});
    })

    
  }

  updateClub(item : any) {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: item, operation: this.translate.instant('HOME.UpdateClub') }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.update(this.service.updateClub(res.item), this.clubs, res.item);

      
      }
    });
  }

  

  addClub() {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: {}, operation: this.translate.instant('HOME.AddClub') }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.add(this.service.addNewClub(res.item), this.clubs, res.item);
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

      console.log('clubs on init', this.clubs);

     
    });
   this.closeSpinner(spinnDialog);
  }

ngOnDestroy(){
  this.subscriptions.unsubscribe;
}
}
