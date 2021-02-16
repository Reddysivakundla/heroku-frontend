import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { RegisterBackend } from '../model/registerBackend';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerDetails:RegisterBackend = new RegisterBackend();
  responseMessage:string = null;
  dispStatus = false;
  creatingStatus = false;

  constructor(private formBuilder:FormBuilder,private commonService:CommonService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required,Validators.minLength(5)]],
      useremail:['',[Validators.required,Validators.email]],
      userpassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
    });
  }

  get f() { return this.registerForm.controls; }


  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    this.registerDetails.userName = this.registerForm.value.username;
    this.registerDetails.useremail = this.registerForm.value.useremail;
    this.registerDetails.password = this.registerForm.value.userpassword;
    this.registerDetails.verifyStatus = "notverified";

    this.creatingStatus = true;
    this.responseMessage = null;
    this.commonService.createUser(this.registerDetails).subscribe(
      data => { 
          this.creatingStatus = false;
          this.dispStatus = true;
       },
       error => {  this.creatingStatus=false, this.responseMessage = error.error.message }
    );
  }

  goLogin(){
    this.router.navigateByUrl("/");
  }

}
