import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submit: boolean = false;
  response: any;

  constructor(
    private router: Router,
    private cardService: CardService,
    private toastr: ToastrService
  ) { }

  loginForm = new FormGroup({
    mobile: new FormControl('' , [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    password: new FormControl('' , [Validators.required])
  });

  ngOnInit() {
    if(localStorage.getItem('userId') && localStorage.getItem('userEmail')){
      this.router.navigate(['dashboard']);
    }
   }

  login(){
    this.submit = true;
    this.cardService.signIn(this.loginForm.value)
    .subscribe((result) => {
      this.response = result;
      localStorage.setItem('userRole', this.response.roles[0]);
      localStorage.setItem('userId', this.response.id);
      localStorage.setItem('companyName', this.response.name);
      localStorage.setItem('defaultTemplate', this.response.defaultTemplate);
      localStorage.setItem('activeEmployeeCard', this.response.activeEmployeeCard);
      localStorage.setItem('cardLimit', this.response.cardLimit);
      this.submit = false;
      if(this.response.roles[0] == 'ROLE_ADMIN')
      {
        this.router.navigate(['admin-panel']);
      }
     else if(this.response.defaultTemplate){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['select-template']);
      }
    },
    (error) => {
      this.submit = false;
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">Invalid Mobile Number or Password.</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'center'
          }
        );
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

}
