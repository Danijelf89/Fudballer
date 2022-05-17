import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { InfodialogComponent } from 'src/app/shared/infodialog/infodialog.component';
import { SpinnerComponentComponent } from 'src/app/shared/spinner-component/spinner-component.component';


@Component({
  selector: 'fu-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  message: string = '';
  name : string = '';

  ngOnInit(): void {
    this.message = this.data.message;
    this.name = this.data.name;
  }

  no() {
    this.dialogRef.close({ result: false });
  }

  yes() {
    this.dialogRef.close({ result: true });
  }
}
