import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classcate',
  templateUrl: './classcate.component.html',
  styleUrls: ['./classcate.component.css']
})
export class ClasscateComponent {
  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  
  cate:any;
  user:any;
  markdata:any;
  results:any;
  
  id:any;
  names:boolean = true
  details:boolean = false
    ngOnInit(): void {
      this.id = this.router.snapshot.paramMap.get('id');

      this.api.getSingleclasscate(this.id).subscribe((res) => {
        console.log('get all data ', res);
        this.cate = res.data;
      })

      this.api.getSingleclassuser(this.id).subscribe((res) => {
        console.log('get all data ', res);
        this.user = res.data;
      })  
    }
    usrr(id:number):void{   
      console.log("asdsf")
      this.names = false;
      this.details = true
      this.api.getsingleuserlog(id).subscribe((res)=>{
        console.log('Get All Data',res);
        this.markdata=res.data;
      })
    }
    gg(){
      this.names = true;
      this.details = false;
    }
    deletecon(id: any){
      this.api.deletecon(id).subscribe((res) => {
        console.log(res, 'deleted Id No');

      });
    }
}
