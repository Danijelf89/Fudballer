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


@Component({

  templateUrl: "./footballers-list.component.html",
  styleUrls: ['./footballers-list.component.css']

})

export class FootballersList implements OnInit {

  constructor(public service: FootballersService, private dialogRef: MatDialog) { }

  listOfFootballer: Observable<IFootballers[]> = new Observable;
  subscriptions: Subscription[] = [];
  showSpinner : boolean = false;

  ngOnInit() {

    this.getFootballers();
  }

  openDetails(item: IFootballers) {
    this.dialogRef.open(FootballerDetails, { data: item, width: '500px' });
  }

  delete(item: IFootballers) {
    
    let di = this.dialogRef.open(DeleteComponent, { data: { item, name: 'footballer' }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getFootballers();
    });
   
  }

  addFootballer() {
    let di = this.dialogRef.open(AddOrUpdateFootballer, { data: { operation: 'Add' }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getFootballers();
    });
  }

  updateFootballer(item: IFootballers) {
    let di = this.dialogRef.open(AddOrUpdateFootballer, { data: { footballer: item, operation: 'Update' }, width: "500px", disableClose: true });
    di.afterClosed().subscribe(res => {
      this.getFootballers();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getFootballers(){
    let dialog =  this.dialogRef.open(SpinnerComponentComponent, {disableClose : true});
    this.listOfFootballer = this.service.getFootballers();
    dialog.close();
  }
}