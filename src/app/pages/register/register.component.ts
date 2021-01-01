import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordMatch: boolean = true;

  registerForm = new FormGroup({
    mobile: new FormControl('' , [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    email: new FormControl('' , [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('' , [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('' , [Validators.required]),
    name: new FormControl('', [Validators.required]),
    usertype: new FormControl('', [Validators.required])
  });
  isSubmitted = false;

  constructor(
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId') && localStorage.getItem('userEmail')){
      this.router.navigate(['dashboard']);
    }
  }

  passwordChange(){
    if(this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value){
      this.passwordMatch = false;
      this.registerForm.invalid;
    }
    else{
      this.passwordMatch = true;
      this.registerForm.valid;
    }
  }

  register(){
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return false;
    } else {
      this.user = new User();
      this.user = this.registerForm.value;
      this.cardService.signUp(this.registerForm.value)
      .subscribe((result) => {
        this.router.navigate(['login']);
      },
      (error) => {
        if(error.error.message == 'Error: Mobile is already in use!'){
          alert('Mobile is already in use!');
        }
        else if(error.error.message == 'Error: Email is already in use!'){
          alert('Email is already in use!');
        }
        else{
          alert("Failed to Register");
        }
      });
    }
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

}
