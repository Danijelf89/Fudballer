import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FootballersService } from 'src/app/Footballers/footballers.service';


@Component({
  selector: 'fu-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddUpdateUserComponent>, private con: FootballersService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, public snack : MatSnackBar) { }

  operationsName: string = '';
  
  addUpdateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    id: new FormControl(),
  });

  ngOnInit(): void {
    this.operationsName = this.data.operation;

    if (Object.keys(this.data.club).length !== 0) {
      this.addUpdateForm.patchValue(this.data.club);
    
    }

    
  }

  get name() {
    return this.addUpdateForm.get('name');
  }

  get surname() {
    return this.addUpdateForm.get('surname');
  }

  get password() {
    return this.addUpdateForm.get('password');
  }

  get userName() {
    return this.addUpdateForm.get('userName');
  }

  get role() {
    return this.addUpdateForm.get('role');
  }

  save(): void {

    if (this.addUpdateForm.valid === false) {
      this.snack.open('Please fill all the mandatory fields');
      return;
    }

    this.dialogRef.close({item : this.addUpdateForm.value})
  }

  cancel() {
    this.dialogRef.close({item : {}});
  }

}
