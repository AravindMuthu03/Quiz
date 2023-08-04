import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent {
  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  connect:any;
  user:any;
  alluser:any;
  id:any


  ngOnInit(): void {

    this.id = this.router.snapshot.paramMap.get('id');
    this.api.getSingleclassuser(this.id).subscribe((res) => {
      console.log('get all data ', res);
      this.user = res.data;
    }) 
    this.api.getAlluser().subscribe((res) => {
      console.log('get all data ', res);
      this.alluser = res.data;
    })

  }

  userForm=new FormGroup({
    'username':new FormControl('',Validators.required),
  })


  quizSubmit() {
    if (this.userForm.valid) {
      const username = this.userForm.get("username")?.value;
  
      this.router.paramMap.subscribe(params => {
        const id = params.get('id');
  
        const postData = {
          username: username,
          q_id: id
        };
  
        this.api.Createcon(postData).subscribe(res => {
          console.log(res, 'quiz added successfully');
          this.userForm.reset();
          this.connect = res.data;
          this.successMsg = res.message;
        }, err => {
          console.log(err);
          this.errMsg = 'An error occurred while adding the user.';
        });
      });
    } else {
      this.errMsg = 'All fields are required';
    }
  }
  
}
