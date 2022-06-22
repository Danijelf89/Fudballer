import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ToastController } from '@ionic/angular';
import { cloneArray } from 'igniteui-angular/lib/core/utils';
import { ToastrService } from 'ngx-toastr';
import { __values } from 'tslib';
import { Club } from '../Clubs/club';
import { IFootballers } from '../Footballers/footballers.model';
import { FootballersService } from '../Footballers/footballers.service';
import { Playersmodel } from '../playersmodel';
import { AddupdateplayerComponent } from '../users/addupdateplayer/addupdateplayer.component';


@Component({
  selector: 'fu-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public toastController: ToastController, private toastr: ToastrService, public service: FootballersService, public mat: MatDialog) { }

  pointsSum: number = 0;
  clubs: Club[] = [];
  Playersmodel: Playersmodel[] = [];
  showHideStandings: boolean = true;
  points: number = 0;
  defaultPosi: number = 1;

  displayedColumnsBase = ['name', 'surname', 'toalPoints'];
  dataSourceBase = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;


  ngOnInit(): void {



    this.Playersmodel = [{
      id: 1,
      name: 'Aneta',
      surname: "Cebovic",
      points: 0,
      pointsSum: 0,
      pictureUrl: "https://problemparrots.co.uk/wp-content/uploads/Budgie.jpg",
      positionCurrentGame : 1
    },
    {
      id: 2,
      name: 'Danijel',
      surname: "Filipovic",
      points: 0,
      pointsSum: 0,
      pictureUrl: "https://problemparrots.co.uk/wp-content/uploads/Budgie.jpg",
      positionCurrentGame : 2
    }

    ];

    this.sortAndPosition();

    this.dataSourceBase.data = this.Playersmodel;

    console.log("datasource", this.dataSourceBase);
  }

  ngAfterViewInit() {
    this.dataSourceBase.data = this.Playersmodel;
  }






  payerForm = new FormGroup({
    points: new FormControl([Validators.required, Validators.min(1)]),
  });



  Addpoints(item: Playersmodel) {

    console.log('pre', this.Playersmodel.length);

    var index = this.Playersmodel.findIndex(x => x.id === item.id);

    this.Playersmodel[index].points = this.payerForm.value.points + this.Playersmodel[index].points;

    

    this.payerForm.reset(this.payerForm.value.points = 0);
this.sortAndPosition();


    

    if(item.points > 1000){
    this.toastr.success(item.name + " " + item.surname, 'WINNER!!!!');

    }
  }

  sortAndPosition(){
    let tempForSort =this.Playersmodel.map((x) => x);

    tempForSort.sort((a, b) => b.points - a.points);
    
        
    
        tempForSort.forEach(childObj=> {
          
          var index = this.Playersmodel.findIndex(x => x.id === childObj.id);
    
          this.Playersmodel[index].positionCurrentGame = this.defaultPosi;
          this.defaultPosi ++;
         
       });
    
        this.defaultPosi = 1;
  }



  addNewPlayer() {
    let di = this.mat.open(AddupdateplayerComponent, { data: { player: {}, operation: "Add" } });
    di.afterClosed().subscribe(res => {
      if (Object.keys(res.result).length > 0) {
        this.Playersmodel.push(res.result);
        this.dataSourceBase = new MatTableDataSource(this.Playersmodel);
        this.showToast();

        this.sortAndPosition();

      }
    })


  }

  async showToast() {
    const t = await this.toastController.create({
      message: 'New player has been added',
      duration: 2000,
      position: 'top',
      color: 'success',

    });
    t.present();
  }

}
function cloneDeep(Playersmodel: Playersmodel[]) {
  throw new Error('Function not implemented.');
}

