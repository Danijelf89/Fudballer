import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { SpinnerComponentComponent } from "./spinner-component/spinner-component.component";

export class Base {

    constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }

    delete(method: Observable<any>, listForDelete: Array<any>, id: number): Array<any> {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been deleted", "");
            var index = listForDelete.findIndex(x => x.id);
            listForDelete.splice(index, 1);
            return listForDelete;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "");
                return listForDelete;
            }

        );
        return listForDelete;
    }

    update(method: Observable<any>, listForupdate: Array<any>, item: any): Array<any> {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been updated", "");
            var index = listForupdate.findIndex(x => x.id === item.id);
            listForupdate[index] = item;
            return listForupdate;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "");
                return listForupdate;
            }

        );
        return listForupdate;
    }

    add(method: Observable<any>, listForAdd: Array<any>, item: any): Array<any> {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been added", "");
            //item.status = this.setStatus(item.club.clubName);
            listForAdd.push(item);
            return listForAdd;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "");
                return listForAdd;
            }

        );
        return listForAdd;
    }

    setStatus(club: string): string {
        if (club !== "-") {
            return 'Under contract'

        }

        return 'Free agent';
    }

    startSpinner() : any{
       return this.dialog.open(SpinnerComponentComponent, { disableClose: true });
    }
}
