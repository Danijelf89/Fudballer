import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
