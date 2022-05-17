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

  constructor(public service: FootballersService, public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  caller: string = "";
  subscriptions: Subscription[] = [];
  name: string = '';

  ngOnInit(): void {
    this.caller = this.data.name;

    if (this.caller === 'footballer') {
      this.name = this.data.item.name + " " + this.data.item.surname;
    }
    else if (this.caller === 'club') {
      this.name = this.data.item.clubName;
    }
  }

  no() {
    this.dialogRef.close();
  }

  yes() {
//ovo vratiti u svoje komponente
    let dialogSpinner = this.dialog.open(SpinnerComponentComponent, { disableClose: true });
    if (this.caller === 'footballer') {
      this.subscriptions.push(this.service.deleteFootballer(this.data.item.id).subscribe((res: any) => {
        dialogSpinner.close();
        this.dialog.open(InfodialogComponent, { data: { name: 'Item has been deleted' }, width: "500px" });
        this.dialogRef.close();
      },
        (error) => {
          dialogSpinner.close();
          this.dialog.open(InfodialogComponent, { data: { name: 'Something went wrong' }, width: "500px" });
        }
      ));
    }

    else if (this.caller === 'club') {

      this.subscriptions.push(this.service.deleteClub(this.data.item.id).subscribe((res: any) => {
        dialogSpinner.close();
        this.dialog.open(InfodialogComponent, { data: { name: 'Item has been deleted' }, width: "500px" });
        this.dialogRef.close();
      },
        (error) => {
          dialogSpinner.close();
          this.dialog.open(InfodialogComponent, { data: { name: 'Something went wrong' }, width: "500px" });
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
