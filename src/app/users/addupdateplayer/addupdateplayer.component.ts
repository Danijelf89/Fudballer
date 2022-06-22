import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastController } from '@ionic/angular';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'fu-addupdateplayer',
  templateUrl: './addupdateplayer.component.html',
  styleUrls: ['./addupdateplayer.component.css']
})
export class AddupdateplayerComponent implements OnInit {

  constructor(public  toastController : ToastController ,private snack : MatSnackBar, public dialogRef: MatDialogRef<AddupdateplayerComponent>) { }

  ngOnInit(): void {
  }

  payerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    pictureUrl: new FormControl("", Validators.required),
    points: new FormControl(0),
  });

  get name() {
    return this.payerForm.get('name');
  }

  get surname() {
    return this.payerForm.get('surname');
  }

  async save(){
    if(!this.payerForm.valid){
     const t = await this.toastController.create({
       message : 'Please fill all mandatory fields!',
       duration : 2000,
       position: 'top',
       color: 'danger',
       
     });

     t.present();
      
      return;

    }

    this.dialogRef.close({result : this.payerForm.value});



  }

}
