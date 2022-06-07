import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { SpinnerComponentComponent } from "./spinner-component/spinner-component.component";
import { TranslateService } from '@ngx-translate/core'

@Component({
    template: ''
})
export class Base {

    constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {
      test
 sa
    }

    dataSourceBase = new MatTableDataSource<any>();
    displayedColumnsBase: string[] = [];
    @ViewChild('paginator') paginator!: MatPaginator;

    pagginatorPageSizeFootballers: number = 0;
    baseUpdateTooltip: string = '';
    baseAddTooltip: string = '';
    baseDeleteTooltip: string = '';

    refreshBaseTooltips(text: string, key: string) {
        switch (key) {
            case 'HOME.Add':
                //this.baseAddTooltip = this.translate.instant('HOME.Add');
                break;
            case 'y':
                // code block
                break;
            case 'y':
                // code block
                break;
            default:
            // code block
        }
    }


    delete(method: Observable<any>, listForDelete: Array<any>, id: number) {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            this.closeSpinner(dialogSpinner);
            this.snackBar.open("Item has been deleted", "", {
                duration: 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            var index = listForDelete.findIndex(x => x.id === id);
            listForDelete.splice(index, 1);
            this.sortListByDate(listForDelete);
            this.dataSourceBase = new MatTableDataSource(listForDelete);
            this.dataSourceBase.paginator = this.paginator;
            // return new MatTableDataSource(listForDelete);

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong or you do not have permission for this action", "", {
                    duration: 5000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                return listForDelete;
            }

        ).unsubscribe;
        //return new MatTableDataSource(listForDelete);
    }

    update(method: Observable<any>, listForupdate: Array<any>, item: any) {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            this.closeSpinner(dialogSpinner);
            this.snackBar.open("Item has been updated", "", {
                duration: 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            var index = listForupdate.findIndex(x => x.id === item.id);
            listForupdate[index] = item;
           

            this.dataSourceBase = new MatTableDataSource(listForupdate);
            this.dataSourceBase.paginator = this.paginator;

        },
            (error: any) => {
                dialogSpinner.close();
                this.snackBar.open("Something went wrong", "", {
                    duration: 2000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                // return listForupdate;
            }

        ).unsubscribe;
        // return listForupdate;
    }

    add(method: Observable<any>, listForAdd: Array<any>, item: any) {

        let dialogSpinner = this.startSpinner();
        method.subscribe((res: any) => {

            this.closeSpinner(dialogSpinner);
            this.snackBar.open("Item has been added", "", {
                duration: 2000,
                verticalPosition: 'top', // 'top' | 'bottom'
                horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
            });
            //item.status = this.setStatus(item.club.clubName);
            listForAdd.push(item);
            this.sortListByDate(listForAdd);
            this.dataSourceBase = new MatTableDataSource(listForAdd);
            this.dataSourceBase.paginator = this.paginator;


        },
            (error: any) => {
                this.closeSpinner(dialogSpinner);
                this.snackBar.open("Something went wrong", "", {
                    duration: 2000,
                    verticalPosition: 'top', // 'top' | 'bottom'
                    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
                });
                //return listForAdd;
            }

        ).unsubscribe;
        //return listForAdd;
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

    closeSpinner(spinnerRef: any) {
        spinnerRef.close();
    }

    sortListByDate(list: any) {
        const sorter = (a: any, b: any) => {
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
        }
        list.sort(sorter);
    }
}
