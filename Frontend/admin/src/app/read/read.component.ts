import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit { 
  public Editor = ClassicEditor;

  constructor(private api: ApiserviceService, private route: ActivatedRoute){}
  readquiz:any;
  successMsg:any;
  id: any; 
  selecteddeleteques:any;
  
  coursename:any 
  getparamid:any;
options: number[] = [0, 1, 2, 3];
optionTexts: any[] = ['', '', '', ''];
questions:any;
ans:any;
images:any;
CID:any;
DIFFID:any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAlldata();

    // this.api.getallcate().subscribe((res) => {
    //   console.log('get all data ', res);
    //   this.cate = res.data;
    // });
    // this.api.getallcate().subscribe((res) => {
    //   console.log('get all data ', res);
    //   this.coursedata = res.data;
    // });

    this.api.getSinglecate(this.id).subscribe((res) => {
      console.log('get all data ', res);
      this.coursename = res.data[0];
    })
    {
    // this.id = this.route.snapshot.paramMap.get('id');
   


    
  }

  
  //get data


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

quizSubmit(){
  const data = {

   question: this.questions,
   image:this.images,
   options: this.optionTexts,
   ans: this.ans,
   CID:this.id,
   DIFFID:this.DIFFID
    };
    
    this.api.CreateQuiz(data).subscribe((res)=>{
      console.log(res,'quiz added successfully')
      this.getAlldata();
      this.successMsg=res.message;
    })
  }
  getAlldata(){
    //instance load data after delete
    this.api.getSingleques(this.id).subscribe((res)=>{
      console.log('Get All Data',res);
      this.readquiz=res.data;
    })
}
//delete Id
deleteId(id:object){
  this.selecteddeleteques = id;
  console.log(this.selecteddeleteques)
  const deletequiz = this.selecteddeleteques.ques_id;
  const Alloptions_id = []
  for(let i of this.selecteddeleteques.options){
    Alloptions_id.push(i.option_id)
  }
  const body = {
    id : deletequiz,
    options : Alloptions_id
  }
  console.log(body)

  // console.log(id,"selected Id" );
  this.api.deleteques(body).subscribe((res)=>{
    console.log(res.msg,'deleted Id No');
    this.successMsg=res.msg;
    this.getAlldata();
  })
}
}
