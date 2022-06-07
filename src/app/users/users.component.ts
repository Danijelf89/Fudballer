import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { FootballersService } from '../Footballers/footballers.service';
import { Base } from '../shared/base';
import { SpinnerComponentComponent } from '../shared/spinner-component/spinner-component.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { User } from './user';
import { TranslateService } from '@ngx-translate/core'
import { DeleteComponent } from '../shared/delete/delete.component';

@Component({
  selector: 'fu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends Base implements OnInit {

  constructor(public service: FootballersService, public mat: MatDialog, snack: MatSnackBar, public translate: TranslateService) {
    super(mat, snack);

    this.displayedColumnsBase = ['name', 'surname','username', 'password', 'role', 'actions'];
  }

  @ViewChild(MatSort) sort!: MatSort;
  listOfUsers: User[] = [];
  subscriptions: Subscription = new Subscription;
  showSpinner: boolean = false;

  clickedRows = new Set<User>();
  isVisibleByRole: boolean = true;

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(){
    this.dataSourceBase.paginator = this.paginator;
    
    this.dataSourceBase.sort = this.sort;
  }

  openDetails(data: any) {

  }


  updateUser(item : any) {
    let di = this.dialog.open(AddUpdateUserComponent, { data: { club: item, operation: this.translate.instant('HOME.UpdateUser') }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {
        this.update(this.service.updateUser(res.item), this.listOfUsers, res.item);

      
      }
    });
  }

  addUser() {
    let di = this.dialog.open(AddUpdateUserComponent, { data: { club: {}, operation: this.translate.instant('HOME.AddUser') }, width: '500px', disableClose: true });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.item).length !== 0) {

        console.log('Added user', res.item);
        this.add(this.service.addNewUser(res.item), this.listOfUsers, res.item);
      }
    });
  }

  deleteUser(item: User) {
    let dialogRef = this.mat.open(DeleteComponent, { data: { message: this.translate.instant('HOME.DeleteClub'), name: item.name + ' ' + item.surname }, width: '500px', disableClose: true });
    dialogRef.afterClosed().subscribe((res : boolean) => {
      if (res === true) {
        super.delete(this.service.deleteUser(item.id), this.listOfUsers, item.id); 
      }
    });
  }

  getUsers() {
    let dialog = this.mat.open(SpinnerComponentComponent, { disableClose: true });
    this.service.getUsers().subscribe(res => {
      this.listOfUsers = res;
      //this.sortListByDate(this.listOfUsers);
      this.dataSourceBase.data = this.listOfUsers;
    }).unsubscribe;
    dialog.close();
  }

}
