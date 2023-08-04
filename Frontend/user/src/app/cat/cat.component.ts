  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute } from "@angular/router";

  import { ApiserviceService } from '../apiservice.service';
  import { QuestionComponent } from '../question/question.component';




  @Component({

    selector: "app-cat",
    templateUrl: "./cat.component.html",
  styleUrls: ["./cat.component.css"],

  })




  export class CatComponent implements OnInit {
    
     
    searchText: any;
    public name :string="";
    Id:any;
    coursedata:any;
   codata: any[] = [];
   showNoResults: boolean = false; 
    // wronguser :boolean = true;
    cordata:any;
  
    
    constructor(private formBuilder: FormBuilder,private api: ApiserviceService, private route: ActivatedRoute) { }



    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      console.log(userId);

 
      this.api.getallcor(userId).subscribe((res) => {
        console.log('get', res);
        this.cordata = res.data;
      })

      // this.api.getallCourse().subscribe((res) => {
      //   console.log('get all data ', res);
      //   this.coursedata = res.data;
      // });

      this.api.getallCo().subscribe((res) => {
        console.log('get all data ', res);
        this.codata = res.data;
      });

      this.name = localStorage.getItem("name")!;

  }
  onSearch() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    this.api.getallcor(userId).subscribe((res) => {
      console.log('get all data ', res);
      this.cordata = res.data;
      console.log(this.searchText);
  
      const filteredData = this.cordata.filter((course: any) =>
        course.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
  
      console.log("filtered data: ", filteredData);
      this.cordata = filteredData;
  
      if (filteredData.length === 0) {
        // No results found
        this.showNoResults = true;
      } else {
        this.showNoResults = false;
      }
    });
  }
  
  
  
    
    
    // if(this.wronguser){
    //   console.log("wronguser")
    // }
    
  } 

  


