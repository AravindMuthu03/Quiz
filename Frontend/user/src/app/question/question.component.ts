import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { interval } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent  implements OnInit {

  public name :string="";
  public questionData:any=[];
  public currentIndex=0;
  public points: number=0;
  public marks: number=0;
  
  public timeIncreased: boolean = false;
  counter=30;
  correctAnswer: number=0;
  incorrectAnswer: number=0;
  public selectedOption :any;
  interval$:any;
  isQuizCompleted : boolean = false;
  progress:string="0";
  public textareaText: string="";
 
  id:any;
  did:any;
  diff:any; 
  usermarkData:any;
  usersubmited:boolean = false;
  loData:any;


  constructor(private api: ApiserviceService, private route: ActivatedRoute, private router: Router) { }


  
  ngOnInit(): void {

    this.name = localStorage.getItem("name")!;

    this.api.getsinglelo(this.name).subscribe((res) => {
      this.loData = res.data[0].id;
    })

    this.api.getallusermark(this.name).subscribe((res) => {

      console.log('mark', res.data);
      this.usermarkData = res.data;
    })

    // this.api.getallfill().subscribe((res) => {
    //   console.log('get all data ', res);
    //   this.fillData = res.data;
    // });

    this.id = this.route.snapshot.paramMap.get('id');
    this.did = this.route.snapshot.paramMap.get('did');

    this.api.getSingleq(this.id, this.did).subscribe((res) => {
      console.log('questions', res.data);
      this.questionData = res.data;
  
    });


 
    
    this.startCounter();                                                                                                                                                                                                                                                                                                                      
  }

  nextQuestion() {

    localStorage.setItem('textareaText', this.textareaText);

    //audio

    // let audio =new Audio();
    // audio.src="../assets/Inter.mp3";
    // audio.preload = "auto";
    // audio.load();
    // audio.play();


    // Increment index and check answer
    console.log(this.selectedOption)
    if (this.selectedOption.answer == 1 || this.textareaText ===  this.questionData[this.currentIndex].answer) {
      this.points += 10*this.counter;
      this.correctAnswer++;
      this.currentIndex++;
      console.log('right')
    
      
    } else {
      console.log('wrong');
      this.incorrectAnswer++;
      this.points -= 10;
      this.currentIndex++
    }
       this.resetCounter();
       this.getProgressPercent();
    console.log(this.points);
    console.log(this.incorrectAnswer);
    this.selectedOption = null;
  }
  
  
  quizSubmit(){

    this.usersubmited = true;

    localStorage.setItem('textareaText', this.textareaText);


    if (this.selectedOption?.answer == 1 || this.textareaText ===  this.questionData[this.currentIndex].answer) {
      this.points += 10*this.counter;
      this.correctAnswer++;
    } else {
      this.points -= 10;
      this.incorrectAnswer++;
    }
    console.log("clicked");
    this.api.updatepoints(
      this.points,
      this.correctAnswer,
      this.incorrectAnswer
      );
      console.log(this.points); 
      console.log(this.incorrectAnswer);


      
    if(this.did == 1){
      this.diff="Easy"
    }
    else if(this.did == 2){
      this.diff="Medium"
    }
    else if (this.did == 3){
      this.diff="Hard"
    }

//..
    let writtencat = []
    for(let i of this.usermarkData){
      writtencat.push(i.categoryid)
    }
    if(writtencat.includes(parseInt(this.id))){
      let writtendiff = []
      for(let i of this.usermarkData){
        if(i.categoryid === parseInt(this.id)){
          writtendiff.push(i.difficulty)
        }
      }
      if(writtendiff.includes(this.diff)){
        let writtenid = null
        for(let i of this.usermarkData){
          if(parseInt(this.id) === i.categoryid && this.diff === i.difficulty){
            writtenid = i.id
          }
        }
        //put
        const body = {
          id : writtenid,
          points : this.points
        }
        this.api.UpdateMark(body).subscribe((res)=>{
          console.log(res,'data updated successfully')
        })
      }
    }else{
      //post
      let body = {
        username : this.name,
        points : this.points,
        difficulty:this.diff,
        category:this.id,
        userid:this.loData,
      }
  
      this.api.CreateData(body).subscribe((res)=>{
        console.log(body)
        console.log(res,'data added successfully')
      })
      this.api.getAllData().subscribe((res)=>{
        console.log('Get All Data',res);
      })
    }


    if(this.currentIndex+1 === this.questionData.length){
      // Navigate to result page
      this.router.navigate(['/result']);
    }
    
  }
  
  // previousQuestion(){
  //   this.currentIndex--;
  // }
  selectOption(option:any){
    this.selectedOption =option;
    console.log(this.selectedOption)
    // this.currentIndex++;
  }
  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0  && !this.usersubmited){
        // Check if this is the last question
        if(this.currentIndex+1 === this.questionData.length){
          this.quizSubmit();
         
        } else {
          // Move to next question
          this.currentIndex++;
          
          // Reset timer for next question
          this.counter=30;
          this.points-=10;
        }
        this.incorrectAnswer++;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },600000);
  }
  
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;

  }
  resetCounter(){
    this.stopCounter();
    this.counter=30;
    this.startCounter();

  }
  getProgressPercent(){
    this.progress=((this.currentIndex /this.questionData.length)*100).toString();
    return this.progress; 
  }
  increaseTime() {
    this.counter += 30;
    this.timeIncreased = true;
  }
 
  // resetQuiz(){
  //   this.resetCounter();
  //   this.questionData();
  //   this.points=0;
  //   this.counter=60;
  //   this.currentIndex;
  // }
  
  }


  


  



