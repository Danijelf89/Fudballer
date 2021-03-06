import { Component, OnInit, ViewChild } from "@angular/core";
import { FootballersService } from "../footballers.service";
import { IFootballers } from "../footballers.model";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddOrUpdateFootballer } from "../add-update-footballer/add-update-footballer.component";
import { DeleteComponent } from "src/app/shared/delete/delete.component";
import { SpinnerComponentComponent } from "src/app/shared/spinner-component/spinner-component.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Base } from "src/app/shared/base";
import { MatSort } from "@angular/material/sort";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { TranslateService } from '@ngx-translate/core'

@Component({

  templateUrl: "./footballers-list.component.html",
  styleUrls: ['./footballers-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})

export class FootballersList extends Base implements OnInit {

  constructor(public service: FootballersService, public mat: MatDialog, snack: MatSnackBar, public translate: TranslateService) {
    super(mat, snack);

    this.displayedColumnsBase = ['name', 'surname', 'position', 'dateOfBirth', 'club', 'actions'];
  }
  @ViewChild(MatSort) sort! : MatSort;
  listOfFootballer: IFootballers[] = [];
  subscriptions: Subscription = new Subscription;
  isVisibleByRole: boolean = true;
  expandedElement = {} as IFootballers;

  ngOnInit() {
    this.getFootballers();
    this.isVisibleByRole = localStorage.getItem("role") != null && localStorage.getItem("role") == "Admin" ? false : true;
  }

  ngAfterViewInit(){
    this.dataSourceBase.paginator = this.paginator;
    this.dataSourceBase.sort = this.sort;
  }

  deleteFootballer(item: IFootballers) {
    let di = this.mat.open(DeleteComponent, { data: { message: this.translate.instant('HOME.DeleteFootballer'), name: item.name + " " + item.surname }, width: '500px', disableClose: true });
    di.afterClosed().subscribe((res: boolean) => {
      if (res === true) {
        super.delete(this.service.deleteFootballer(item.id), this.listOfFootballer, item.id);
      }
    }).unsubscribe;
  }

  addFootballer() {
    let di = this.mat.open(AddOrUpdateFootballer, { data: { footballer: {}, operation: this.translate.instant('HOME.AddFootballer') }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        // res.item.clubId = res.item.club.id;
        res.item.status = super.setStatus(res.item.club.clubName);
        super.add(this.service.addNewFootballer(res.item), this.listOfFootballer, res.item);
      }
    }).unsubscribe;
  }

  updateFootballer(item: IFootballers) {
    let di = this.mat.open(AddOrUpdateFootballer, { data: { footballer: item, operation: this.translate.instant('HOME.UpdateFootballer') }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        res.item.status = super.setStatus(res.item.club.clubName);
        super.update(this.service.updateFootballer(res.item), this.listOfFootballer, res.item);
      }
    }).unsubscribe;
  }

  getFootballers() {
    let dialog = this.mat.open(SpinnerComponentComponent, { disableClose: true });
    this.service.getFootballers().subscribe(res => {
      this.listOfFootballer = res;
      this.sortListByDate(this.listOfFootballer);
      this.dataSourceBase.data = this.listOfFootballer;
    }).unsubscribe;
   dialog.close();
  }
}