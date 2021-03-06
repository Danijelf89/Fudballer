import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { SpinnerComponentComponent } from 'src/app/shared/spinner-component/spinner-component.component';

import { Club } from '../club';


@Component({
  selector: 'fu-add-update-club',
  templateUrl: './add-update-club.component.html',
  styleUrls: ['./add-update-club.component.css']
})
export class AddUpdateClubComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddUpdateClubComponent>, private con: FootballersService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, public snack : MatSnackBar) { }

  operationsName: string = '';
  
  addUpdateForm = new FormGroup({
    clubName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    budget: new FormControl(0, Validators.required),
    founded: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required),
    id : new FormControl(0),
    isDefault : new FormControl(false),
    creationDate : new FormControl(Date.UTC),
    pictureUrl : new FormControl('')
  });

  get clubName() {
    return this.addUpdateForm.get('clubName');
  }

  get city() {
    return this.addUpdateForm.get('city');
  }

  get budget() {
    return this.addUpdateForm.get('budget');
  }

  get founded() {
    return this.addUpdateForm.get('founded');
  }

  get owner() {
    return this.addUpdateForm.get('owner');
  }

  ngOnInit(): void {
    this.operationsName = this.data.operation;

    if (Object.keys(this.data.club).length !== 0) {
      this.addUpdateForm.patchValue(this.data.club);
    
    }

    
  }

  save(): void {

    if (this.addUpdateForm.valid === false) {
      this.snack.open('Please fill all the mandatory fields');
      return;
    }

    this.addUpdateForm.patchValue({
      creationDate: new Date,
    });
    this.dialogRef.close({item : this.addUpdateForm.value})

    console.log('Added', this.addUpdateForm.value);
  }

  cancel() {
    this.dialogRef.close({item : {}});
  }

  ngOnDestroy() {
  }
}
