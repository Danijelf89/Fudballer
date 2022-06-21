import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../Clubs/club';
import { IFootballers } from '../Footballers/footballers.model';
import { FootballersService } from '../Footballers/footballers.service';
import { Playersmodel } from '../playersmodel';

@Component({
  selector: 'fu-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private toastr: ToastrService, public service: FootballersService) { }

  pointsSum: number = 0;
  clubs: Club[] = [];
  Playersmodel : Playersmodel[] = [];
  showHideStandings : boolean = true;


  displayedColumnsBase = ['name', 'surname', 'toalPoints'];
  dataSourceBase = new MatTableDataSource<any>(); 
  @ViewChild('paginator') paginator!: MatPaginator;


  ngOnInit(): void {
   


    this.Playersmodel = [{
      id:1,
      name : 'Aneta',
      surname : "Cebovic",
      points : 0,
      pointsSum : 0,
      pictureUrl : "https://problemparrots.co.uk/wp-content/uploads/Budgie.jpg"
    },
    {
      id:2,
      name : 'Danijel',
      surname : "Filipovic",
      points : 0,
      pointsSum : 0,
      pictureUrl : "https://problemparrots.co.uk/wp-content/uploads/Budgie.jpg"
    }
  
  ];

    this.dataSourceBase.data = this.Playersmodel;

    console.log("datasource", this.dataSourceBase);
  }

  ngAfterViewInit(){
    this.dataSourceBase.data = this.Playersmodel;
  }

 


  payerForm = new FormGroup({
    points: new FormControl(0,[Validators.required, Validators.min(1)]),
  });

  



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

    this.dataSourceBase = new MatTableDataSource(this.Playersmodel);
  }

}
