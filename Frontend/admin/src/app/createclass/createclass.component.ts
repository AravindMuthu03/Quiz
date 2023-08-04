import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent {
  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  login:any;


  userForm=new FormGroup({
    'classname':new FormControl('',Validators.required),
  })

  quizSubmit(){
    // console.log(this.quizForm.value);
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.api.Createclass(this.userForm.value).subscribe((res)=>{
        console.log(res,'quiz added successfully')
        this.userForm.reset();
        this.successMsg=res.message;
      })
    }
    else
    this.errMsg='All fields are required';
  }
}
