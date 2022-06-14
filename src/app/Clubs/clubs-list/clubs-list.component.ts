import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IFootballers } from 'src/app/Footballers/footballers.model';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { Base } from 'src/app/shared/base';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AddUpdateClubComponent } from '../add-update-club/add-update-club.component';
import { Club } from '../club';
import { ClubDetailsComponent } from '../club-details/club-details.component';
import { TranslateService } from '@ngx-translate/core'
import { ClubsFacade } from '../clubs-facade';

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

  constructor(protected facade:ClubsFacade, private changeDetectorRefs: ChangeDetectorRef, public service: FootballersService, public mat: MatDialog, 
    public snack: MatSnackBar, public translate: TranslateService ) {
    super(mat, snack);

    this.displayedColumnsBase = ['clubName', 'city', 'budget', 'founded', 'owner', 'actions'];
  }

  @ViewChild(MatSort) sort! : MatSort;
  clickedRows = new Set<Club>();
  clubs: Club[] = [];
  subscriptions: Subscription = new Subscription;
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
    this.subscriptions =  dialogRef.afterClosed().subscribe((res : boolean) => {
      if (res === true) {
        super.delete(this.service.deleteClub(item.id), this.clubs, item.id); 
      }
    });
  }

  openListOfFootballers(item: Club) {
    this.subscriptions = this.service.getClubsFootballers(item.id).subscribe(res =>{
      this.listOfFootballers = res;
      this.mat.open(ClubDetailsComponent, { data: this.listOfFootballers});
    })
  }

  updateClub(item : any) {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: item, operation: this.translate.instant('HOME.UpdateClub') }, width: '500px', disableClose: true });
    this.subscriptions =  di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.update(this.service.updateClub(res.item), this.clubs, res.item);
      }
    });
  }

  addClub() {
    let di = this.dialog.open(AddUpdateClubComponent, { data: { club: {}, operation: this.translate.instant('HOME.AddClub') }, width: '500px', disableClose: true });
    this.subscriptions =  di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.add(this.service.addNewClub(res.item), this.clubs, res.item);
      }
    });
  }

  getClubs() {
    let spinnDialog = this.startSpinner();
    this.subscriptions = this.service.getClubs().subscribe(res => {
      this.clubs = res;
      this.sortListByDate(this.clubs);
      this.dataSourceBase.data = this.clubs;
    });
   this.closeSpinner(spinnDialog);
  }

ngOnDestroy(){
  this.subscriptions.unsubscribe;
}
}
