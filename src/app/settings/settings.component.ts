import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Base } from '../shared/base';

@Component({
  selector: 'fu-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends Base implements OnInit {

  constructor(public dialogRef: MatDialogRef<SettingsComponent>, public mat: MatDialog,public snack: MatSnackBar) {
    super(mat, snack);
  }

  ngOnInit(): void {
  }

  settingsForm = new FormGroup({
    pageSizeFootballers: new FormControl(1, Validators.required),
   
});

get pageSizeFootballers() {
  return this.settingsForm.get('pageSizeFootballers');
}

save(): void {
  if (this.settingsForm.valid === false) {

      this.snack.open("Please fill all the mandatory fields");
      return;
  }

  this.pagginatorPageSizeFootballers  = this.settingsForm.value.pageSizeFootballers;

  environment.test = this.pagginatorPageSizeFootballers;

  console.log('pag size', this.pagginatorPageSizeFootballers);

  this.dialogRef.close();

}

cancel() {
  this.dialogRef.close({item : {}});
}

}


