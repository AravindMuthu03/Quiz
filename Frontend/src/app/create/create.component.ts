import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  public Editor = ClassicEditor;

  // quizForm!:FormGroup one More trick

  constructor(private api:ApiserviceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  cate:any; 
options: number[] = [0, 1, 2, 3];
optionTexts: any[] = ['', '', '', ''];
questions:any;
ans:any;
images:any;
CID:any;
DIFFID:any;
id: any;


  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.api.getsdata(this.id).subscribe((res) => {
      console.log('get all data ', res);
      this.cate = res.data;
      this.questions = res.data[0].ques
      // this.questions=res.data[0].question
          this.images=res.data[0].image
          this.optionTexts =res.data[0].options
          this.CID=res.data[0].CID
          this.ans=res.data[0].answer
          this.DIFFID=res.data[0].DiffID
    });
    //for update
    // this.getparamid=this.router.snapshot.paramMap.get('id');
    // if(this.getparamid){
    //   this.api.getSingleData(this.getparamid).subscribe((res)=>{
    //     console.log(res,'selected update data');
    //     this.questions=res.data[0].question
    //     this.images=res.data[0].image
    //     this.optionTexts  =res.data[0].options
    //     this.CID=res.data[0].CID
    //     this.ans=res.data[0].answer
    //     this.DIFFID=res.data[0].DIFFID
    //   })
    // }
    
  }
  addoption() {

    this.options.push(this.options.length);
    this.optionTexts.push('');
    }

    removeOption(index: number) {
      this.options.splice(index, 1);
      this.optionTexts.splice(index, 1); 
      this.ans.splice(index, 1);
      }

  // quizSubmit(){
  //   const data = {

  //    question: this.questions,
  //    image:this.images,
  //    options: this.optionTexts,
  //    ans: this.ans,
  //    CID:this.id,
  //    DIFFID:this.DIFFID
  //     };
      
  //     this.api.CreateQuiz(data).subscribe((res)=>{
  //       console.log(res,'quiz added successfully')
        
  //       this.successMsg=res.message;
  //     })
  //   }


  // update submit
  // updatequiz(){
  //   const data = {

  //     question: this.questions,
  //     image:this.images,
  //       options: this.optionTexts,
  //       answer: this.ans,
  //       CID:this.CID,
  //       DIFFID:this.DIFFID
       
       
  //      };
  //      this.api.updateData(data,this.getparamid).subscribe((res)=>{
  //        console.log(res,'quiz added successfully')
  //        this.successMsg=res.message;
  //      })
  //   }
    
  }


