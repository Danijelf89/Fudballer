import { OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription } from "rxjs";
import { SpinnerComponentComponent } from "./spinner-component/spinner-component.component";

export class Base{

    constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }
   
    delete(method: Observable<any>, listForDelete: Array<any>, id: number): Array<any> {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been deleted", "", {
                duration : 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            var index = listForDelete.findIndex(x => x.id);
            listForDelete.splice(index, 1);
            return listForDelete;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "", {
                    duration : 2000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                return listForDelete;
            }

        ).unsubscribe;
        return listForDelete;
    }

    update(method: Observable<any>, listForupdate: Array<any>, item: any): Array<any> {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been updated", "", {
                duration : 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            var index = listForupdate.findIndex(x => x.id === item.id);
            listForupdate[index] = item;
            return listForupdate;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "", {
                    duration : 2000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                return listForupdate;
            }

        ).unsubscribe;
        return listForupdate;
    }

    add(method: Observable<any>, listForAdd: Array<any>, item: any): Array<any> {

        let dialogSpinner = this.startSpinner();
            method.subscribe((res: any) => {

            dialogSpinner.close();
            this.snackBar.open("Item has been added", "", {
                duration : 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            //item.status = this.setStatus(item.club.clubName);
            listForAdd.push(item);
            return listForAdd;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "", {
                    duration : 2000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                return listForAdd;
            }

        ).unsubscribe;
        return listForAdd;
    }

    setStatus(club: string): string {
        if (club !== "-") {
            return 'Under contract'
        }
        return 'Free agent';
    }

    startSpinner(): any {
        return this.dialog.open(SpinnerComponentComponent, { disableClose: true });
    }
}
