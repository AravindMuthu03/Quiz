import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent {
  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
classroom:any;

  ngOnInit(): void {

   this.getallClass();

  }
  deleteId(id:any){
    // console.log(id,"selected Id" );
    this.api.deleteclass(id).subscribe((res)=>{
      console.log(res,'deleted Id No');
      this.getallClass();
    })
  }

getallClass(){
  this.api.getallclass().subscribe((res) => {
    console.log('get all data ', res);
    this.classroom = res.data;
    
  });
}
}
