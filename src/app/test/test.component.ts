import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Playersmodel } from '../playersmodel';

@Component({
  selector: 'fu-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  pointsSum: number = 0;

  ngOnInit(): void {
  }

  payerForm = new FormGroup({
    points: new FormControl(0,[Validators.required, Validators.min(1)]),
  });

  Playersmodel : Playersmodel[] = [];






  Addpoints(item : Playersmodel){

    if(!this.payerForm.valid){


    }
    item.points = item.points + this.payerForm.value.points;

    if(item.points > 1000){
      this.toastr.success(item.name + " " + item.surname, 'WINNER!!!!');

    }
  }

  addNewPlayer(){
    this.Playersmodel.push({
      id:1,
      name : 'Aneta',
      surname : "Cebovic",
      points : 0,
      pointsSum : 0,
      pictureUrl : "https://problemparrots.co.uk/wp-content/uploads/Budgie.jpg"
    });
  }

}
