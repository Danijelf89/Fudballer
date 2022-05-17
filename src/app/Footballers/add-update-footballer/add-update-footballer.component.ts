
import { Component, Inject, OnInit } from "@angular/core";
import { FootballersService } from "../footballers.service";
import { IFootballers } from "../footballers.model";
import { Club } from "src/app/Clubs/club";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InfodialogComponent } from "src/app/shared/infodialog/infodialog.component";
import { SpinnerComponentComponent } from "src/app/shared/spinner-component/spinner-component.component";


@Component({
    selector: 'fu-addFootballer',
    templateUrl: "./add-update-footballer.component.html",
    styleUrls: ["./add-update-footballer.component.css"]

})

export class AddOrUpdateFootballer implements OnInit {
    constructor(public dialogRef: MatDialogRef<AddOrUpdateFootballer>, private con: FootballersService,
        @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private fb: FormBuilder
    ) { }

    operationsName: string = '';
    footbaler: IFootballers = {} as IFootballers;
    //moze sa new subsciption
    subscriptions: Subscription[] = [];
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
        if (this.operationsName === "Update") {
            this.addUpdateForm.patchValue({
                name: this.data.footballer.name, surname: this.data.footballer.surname,
                position: this.data.footballer.position, dateOfBirth: this.data.footballer.dateOfBirth,
                rating: this.data.footballer.rating, price: this.data.footballer.price,
                clubId: this.data.footballer.clubId, id: this.data.footballer.id, club: this.data.footballer.club
            });
        }
        this.subscriptions.push(this.con.getClubs().subscribe(res => {
            this.lisClubs = res;
        }));

        dialogspinner.close()
    }

    //vratiti u komponentu
    save(): void {
        if (this.addUpdateForm.valid === false) {
            this.dialog.open(InfodialogComponent, { data: { name: 'Please fill all the mandatory fields' } });
            return;
        }

        if (this.operationsName === "Update") {
            this.footbaler = this.addUpdateForm.value;
            let dialogspinner = this.dialog.open(SpinnerComponentComponent, { disableClose: true });

            this.subscriptions.push(this.con.updateFootballer(this.footbaler).
                subscribe((res: any) => {
                    this.dialog.open(InfodialogComponent, { data: { name: 'Item has been updated' }, width: "500px" });
                    this.dialogRef.close();
                    dialogspinner.close();
                    return;
                },
                    (error) => {
                        this.dialog.open(InfodialogComponent, { data: { name: 'Something went wrong' }, width: "500px" });
                        dialogspinner.close();
                        return;
                    }
                ));
        }
        else {

            let dialogspinner = this.dialog.open(SpinnerComponentComponent, { disableClose: true });
            this.footbaler = this.addUpdateForm.value;
            this.footbaler.clubId = this.addUpdateForm.value.club.id;
            this.subscriptions.push(this.con.addNewFootballer(this.footbaler).subscribe((res: any) => {
                dialogspinner.close();
                this.dialog.open(InfodialogComponent, { data: { name: 'Item has been added' }, width: "500px" });
                this.dialogRef.close();
                return;

            },
                (error) => {
                    dialogspinner.close();
                    this.dialog.open(InfodialogComponent, { data: { name: 'Something went wrong' }, width: "500px" });
                    return;
                }
            ));
        }
    }

    cancel() {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}