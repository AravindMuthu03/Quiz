import { Component,OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit { 


  constructor(private api:ApiserviceService){}
  readquiz:any;
  successMsg:any;
  ngOnInit(): void {
    this.getAllData();
    
  }

  //delete Id
  deleteId(id:any){
    // console.log(id,"selected Id" );
    this.api.deletedata(id).subscribe((res)=>{
      console.log(res,'deleted Id No');
      this.getAllData();

    })
  }
  //get data
  getAllData(){
      //instance load data after delete
      this.api.getAllData().subscribe((res)=>{
        console.log('Get All Data',res);
        this.readquiz=res.data;
  
      })
  }

}
