import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit{

  // quizForm!:FormGroup one More trick

  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  login:any;


  ngOnInit(): void {

     
    this.api.getAlluser().subscribe((res) => {
      console.log('get all data ', res);
      this.login = res.data;
    });
  }

  userForm=new FormGroup({
    'username':new FormControl('',Validators.required),
  })

  quizSubmit(){
    // console.log(this.quizForm.value);
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.api.CreateUser(this.userForm.value).subscribe((res)=>{
        console.log(res,'quiz added successfully')
        this.userForm.reset();
        this.successMsg=res.message;
        this.api.getAlluser().subscribe((res) => {
          console.log('get all data ', res);
          this.login = res.data;
        });
      })
    }
    else
    this.errMsg='All fields are required';
  }
  
  //delete Id
  deleteuser(id: any){
    this.api.deleteuser(id).subscribe((res) => {
      console.log(res, 'deleted Id No');
      this.api.getAlluser().subscribe((res) => {
        console.log('get all data ', res);
        this.login = res.data;
      });
    });
  }
  //update submit
  // updatequiz(){
  //   // console.log(this.quizForm.value);
  //   if(this.quizForm.valid){
  //     this.api.updateData(this.quizForm.value,this.getparamid).subscribe((res)=>{
  //       console.log(res,'data updated successfully ');
  //       this.successMsg = res.message;

  //     })
  //   }else{
  //     this.errMsg='All fields are required'

  //   }
  //   }
  }


