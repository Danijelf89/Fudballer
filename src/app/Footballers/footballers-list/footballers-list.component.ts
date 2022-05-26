import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { Component, ElementRef, OnChanges, OnInit, Optional, SimpleChanges, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FootballersService } from "../footballers.service";
import { IFootballers } from "../footballers.model";
import { forkJoin, map, mergeMap, Observable, Subscription } from "rxjs";

import { FootballerDetails } from "../footballer-details/footballer-details.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddOrUpdateFootballer } from "../add-update-footballer/add-update-footballer.component";
import { DeleteComponent } from "src/app/shared/delete/delete.component";
import { SpinnerComponentComponent } from "src/app/shared/spinner-component/spinner-component.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Base } from "src/app/shared/base";
import { basename } from "path";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";


@Component({

  templateUrl: "./footballers-list.component.html",
  styleUrls: ['./footballers-list.component.css']

})

export class FootballersList extends Base implements OnInit {

  constructor(public service: FootballersService, public mat: MatDialog, snack: MatSnackBar) {
    super(mat, snack);

    this.displayedColumnsBase = ['name', 'surname', 'position', 'dateOfBirth', 'rating', 'price', 'club', 'status', 'actions'];
  }

  @ViewChild(MatSort) sort! : MatSort;
  listOfFootballer: IFootballers[] = [];
  subscriptions: Subscription = new Subscription;
  showSpinner: boolean = false;

  clickedRows = new Set<IFootballers>();
  isVisibleByRole : boolean = true;
   


  


  ngOnInit() {

    this.getFootballers();
    this.isVisibleByRole = localStorage.getItem("role") != null && localStorage.getItem("role") == "Admin" ? false : true;

  }

  ngAfterViewInit(){
    this.dataSourceBase.paginator = this.paginator;
    
    this.dataSourceBase.sort = this.sort;
  }

  openDetails(item: IFootballers) {
    this.mat.open(FootballerDetails, { data: item, width: '500px' });
  }

  onclickedRow(item :any){

  }

  deleteFootballer(item: IFootballers) {
    let di = this.mat.open(DeleteComponent, { data: { message: 'Are you sure you want do delete this footballer?', name: item.name + " " + item.surname }, width: '500px', disableClose: true });
    di.afterClosed().subscribe((res : boolean) => {
      if (res === true) {
        super.delete(this.service.deleteFootballer(item.id), this.listOfFootballer, item.id);
      }
    })
  }

 

  addFootballer() {
    let di = this.mat.open(AddOrUpdateFootballer, { data: { footballer : {}, operation: 'Add new footballer' }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      if(Object.keys(res.item).length !== 0){
        res.item.clubId = res.item.club.id;
        res.item.status = super.setStatus(res.item.club.clubName);
        super.add(this.service.addNewFootballer(res.item), this.listOfFootballer, res.item);

      }
    });
  }

  updateFootballer(item: IFootballers) {
    let di = this.mat.open(AddOrUpdateFootballer, { data: { footballer: item, operation: 'Update footballer' }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        res.item.status = super.setStatus(res.item.club.clubName);
        super.update(this.service.updateFootballer(res.item), this.listOfFootballer, res.item);
      }
    });
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