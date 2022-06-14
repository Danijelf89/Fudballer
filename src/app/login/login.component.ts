import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FootballersService } from '../Footballers/footballers.service';

@Component({
  selector: 'fu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;

  constructor(@Optional() public dialogRef: MatDialogRef<LoginComponent>, private router: Router, private con: FootballersService) { }

  loginForm = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })


  ngOnInit(): void {
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ok() {
    if(!this.loginForm.valid){
      return;
    }

    this.con.getAuthorisation(this.loginForm.value).subscribe(res => {
      const token = (<any>res).token;
      const name = res.name;
      const surname = res.surname;

      console.log('name', name);
      console.log('surname', surname);

      localStorage.setItem("jwt", token);
      localStorage.setItem("name", name);
      localStorage.setItem("surname", surname);
      localStorage.setItem("role", res.role);

      console.log('token', localStorage.getItem("jwt"));

      this.invalidLogin = false;
      this.dialogRef.close({success : true});
      this.router.navigate(['welcomePage']);
    },
      err => {
        console.log('error pri loginu');
        this.invalidLogin = true;

      });
  }

  cancel() {
    this.dialogRef.close({success : false});
  }

}
