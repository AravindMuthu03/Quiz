import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  login:any;
  markdata:any;
  Id:any;
  rr:any;
  names:boolean = true
  details:boolean = false

  ngOnInit(): void {

     
    this.api.getAlluser().subscribe((res) => {
      console.log('get all data ', res);
      this.login = res.data;
    });
  }

  user(id:number):void{   
    this.names = false;
    this.details = true
    this.api.getsingleuserlog(id).subscribe((res)=>{
      console.log('Get All Data',res);
      this.rr=res
      this.markdata=res.data;
      console.log(this.markdata)
    })
  }
  gg(){
    this.names = true;
    this.details = false;
  }
  // generateRandomColor(): string {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }


}
