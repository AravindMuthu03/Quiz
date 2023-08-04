import { Component,OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit { 


  constructor(private api:ApiserviceService){}
  coursedata:any;
  ngOnInit(): void {

    this.api.getallcate().subscribe((res) => {
      console.log('get all data ', res);
      this.coursedata = res.data;
    });
    

  }
}
