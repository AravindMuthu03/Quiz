import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public questionData:any[]=[];
  public currentIndex=0;
  public points: number=0;
  public total:number=0;
  public totalPoints:number=0;
  public readQuiz: any[] = [];
  public showtable:boolean=false;

  toggle(){
    this.showtable=true;
  }


  

 
  correctAnswer: number=0;
  incorrectAnswer: number=0;
  name:any;

  shareUrl: string = window.location.href;
 
 


  constructor(private api:ApiserviceService){}



  ngOnInit(): void {
   this.points = this.api.gotpoints;
   this.correctAnswer = this.api.gotcorrect;
   this.incorrectAnswer=this.api.gotincorrect
   this.getAllffata();
   this.name = localStorage.getItem("name")!;
  }
  getAllffata(){
    this.api.getAllData().subscribe((res)=>{
      console.log('Get All Data',res);
      this.readQuiz=res.data.sort((a: any, b: any) => b.points - a.points);
    })
  }
}
