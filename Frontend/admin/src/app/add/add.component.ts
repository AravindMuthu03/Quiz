import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  cate:any;


  ngOnInit(): void {
  
    
    this.api.getallcate().subscribe((res) => {
      console.log('get all data ', res);
      this.cate = res.data;
    });

    
    this.getparamid=this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.api.getSinglecate(this.getparamid).subscribe((res)=>{
        console.log(res,'selected update data');
        this.cateForm.patchValue({
          'category':res.data[0].category,
          'image':res.data[0].image,
          'name':res.data[0].classroom_id,
        })
      })
    }
  }

  cateForm=new FormGroup({
    'category':new FormControl('',Validators.required),
    'image':new FormControl('',Validators.required),
    'name':new FormControl('',Validators.required),
  })

  quizSubmit(){
    // console.log(this.quizForm.value);
    if(this.cateForm.valid){
      console.log(this.cateForm.value);
      this.api.Createcate(this.cateForm.value).subscribe((res)=>{
        console.log(res,'quiz added successfully')
        this.cateForm.reset();
        // this.successMsg=res.message;
        this.api.getallcate().subscribe((res) => {
          console.log('get all data ', res);
          this.cate = res.data;
        });
      })
    }
    else
    this.errMsg='All fields are required';
  }
 
  deletecat(id: any){
    this.api.deletecate(id).subscribe((res) => {
      console.log(res, 'deleted Id No');
      this.api.getallcate().subscribe((res) => {
        console.log('get all data ', res);
        this.cate = res.data;
      });
    });
  }

  // update submit
  // updatequiz(){
  //   // console.log(this.quizForm.value);
  //   if(this.quizForm.valid){
  //     this.api.updatecat(this.quizForm.value,this.getparamid).subscribe((res)=>{
  //       console.log(res,'data updated successfully ');
  //       this.successMsg = res.message;

  //     })
  //   }else{
  //     this.errMsg='All fields are required'

  //   }
  //   }
  }


