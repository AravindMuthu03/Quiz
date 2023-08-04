import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = new FormControl();

  constructor(private api: ApiserviceService, private router: ActivatedRoute) { }

  errMsg: any;
  successMsg: any;
  getparamid: any;
  login: any;

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'username': new FormControl('', Validators.required),
  })

  quizsubmit() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.api.CreateUser(this.userForm.value).subscribe((res) => {
        console.log(res, 'quiz added successfully');
        alert('Registered Successfully')
      });
    }
  }
}

  
