
import { Component, Inject, OnInit } from "@angular/core";
import { FootballersService } from "../footballers.service";
import { Club } from "src/app/Clubs/club";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SpinnerComponentComponent } from "src/app/shared/spinner-component/spinner-component.component";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'fu-addFootballer',
    templateUrl: "./add-update-footballer.component.html",
    styleUrls: ["./add-update-footballer.component.css"]

})

export class AddOrUpdateFootballer implements OnInit {
    constructor(public dialogRef: MatDialogRef<AddOrUpdateFootballer>, private con: FootballersService,
        @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private fb: FormBuilder,private snack : MatSnackBar
    ) { }

    operationsName: string = '';
    subscriptions: Subscription = new Subscription;
    lisClubs: Club[] = [];

    addUpdateForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        rating: new FormControl(1, [Validators.max(5), Validators.min(1)]),
        price: new FormControl(0, Validators.required),
        clubId: new FormControl(0, Validators.required),
        club: new FormControl(null, Validators.required),
        id: new FormControl(0),
        creationDate : new FormControl(Date)
    });

    get name() {
        return this.addUpdateForm.get('name');
    }

    get surname() {
        return this.addUpdateForm.get('surname');
    }

    get position() {
        return this.addUpdateForm.get('position');
    }

    get dateOfBirth() {
        return this.addUpdateForm.get('dateOfBirth');
    }

    get rating() {
        return this.addUpdateForm.get('rating');
    }

    get price() {
        return this.addUpdateForm.get('price');
    }

    get club() {
        return this.addUpdateForm.get('club');
    }

    ngOnInit(): void {

        let dialogspinner = this.dialog.open(SpinnerComponentComponent, { disableClose: true });
        this.operationsName = this.data.operation;
        if (Object.keys(this.data.footballer).length !== 0) {
            this.addUpdateForm.patchValue({
                name: this.data.footballer.name, surname: this.data.footballer.surname,
                position: this.data.footballer.position, dateOfBirth: this.data.footballer.dateOfBirth,
                rating: this.data.footballer.rating, price: this.data.footballer.price,
                clubId: this.data.footballer.clubId, id: this.data.footballer.id, club: this.data.footballer.club
            });
        }
        this.subscriptions = this.con.getClubs().subscribe(res => {
            this.lisClubs = res;
        });

        dialogspinner.close()
    }

    save(): void {
        if (this.addUpdateForm.valid === false) {

            this.snack.open("Please fill all the mandatory fields");
            return;
        }

        this.addUpdateForm.patchValue({
            creationDate: new Date,
          });

        this.dialogRef.close({item : this.addUpdateForm.value});

    }

    cancel() {
        this.dialogRef.close({item : {}});
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe;
    }
}