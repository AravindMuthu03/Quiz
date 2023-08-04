import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;

  errMsg: any;
  public loginData:any=[];
  username: FormControl = new FormControl('', Validators.required);
  wronguser :boolean = true;
  user_id:any;


  constructor(private api:ApiserviceService, private route: Router){}

  ngOnInit(): void {
    
    this.api.getallUser().subscribe((res) => {
      console.log('get all data ', res);
      this.loginData = res.data;
    });    
  }

  
  StartQuiz() {
    const name = this.nameKey.nativeElement.value;
    localStorage.setItem('name', name);

    // let audio =new Audio();
    // audio.src="../assets/Inter.mp3";
    // audio.preload = "auto";
    // audio.load();
    // audio.play();
  
    for (let i of this.loginData) {
      if (i.username === name) {
        console.log('Username matched:', name);
        this.wronguser = false;
        this.user_id = i.id;
    
        // Pass user_id as a parameter in the URL and navigate to the 'cat' component
        this.route.navigateByUrl(`/cat/${this.user_id}`);
        break;
      }
    }

  if(this.wronguser){
    alert('Wrong User')
    console.log("wronguser")
  }

  }
  
}

