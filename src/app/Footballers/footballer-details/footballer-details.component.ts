import { Component, Inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { inject } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IFootballers } from "../footballers.model";

@Component({
    selector: 'pm-footballerdetails',
    templateUrl: "./footballer-details.component.html",
    styleUrls: ['./footballer-details.component.css']

})
export class FootballerDetails {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    }

    selectedFootballer = this.data;
}