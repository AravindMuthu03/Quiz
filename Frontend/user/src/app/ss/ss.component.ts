import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

import { ApiserviceService } from '../apiservice.service';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-ss',
  templateUrl: './ss.component.html',
  styleUrls: ['./ss.component.css']
})
export class SsComponent {

  Id:any;
  id:any;
  diffdata:any;
  coursedata:any;
  did:any;
  

  constructor(private api: ApiserviceService, private route: ActivatedRoute) { }


  
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');


  
    // this.api.getalldiff().subscribe((res) => {
    //   console.log('get all data ', res);
    //   this.diffdata = res.data;
    // });

    this.api.getsinglecat(this.id).subscribe((res) => {
      console.log('get all data ', res);
      this.diffdata = res.data;
    });
}
}
