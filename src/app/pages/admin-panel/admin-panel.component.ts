import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'app/service/card.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/User';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  usersArray: any[] = [];  
  loading: boolean = false;
  users: Observable<User[]>;  
  dtTrigger: Subject<any>= new Subject();  
  private id:any;
  // student : User=new User();  
  constructor(
    private router: Router,
    private cardService: CardService
  ){}

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }

    this.getAllUser();
  }

  getAllUser(){
    this.cardService.getAllUser()
    .subscribe((result) => {
     this.users = result;
      this.dtTrigger.next();  
    },
    (error) => {
      console.log(error);
      alert('Failed to load Data');
    });
  }

  deleteUserById(id: number){
    this.loading = true;
    this.cardService.deleteUserById(id)
    .subscribe((result) => {
      this.getAllUser();
      this.loading = false;
    },
    (error) => {
      console.log(error);
      alert('Failed to delete');
      this.loading = false;
    });
  }

  setBusinessCard(id:any)
  {
    this.cardService.setBusinessCard(id)
    .subscribe((result) => {
      this.getAllUser();
      this.loading = false;
    },
    (error) => {
      console.log(error);
     // alert('Failed to Set Card Type ');
      this.loading = false;
    });
  }
  setEmployeeCard(id:any)
  {
    this.cardService.setEmployeeCard(id)
    .subscribe((result) => {
      this.getAllUser();
      this.loading = false;
    },
    (error) => {
      console.log(error);
     // alert('Failed to Set Card Type ');
      this.loading = false;
    });
  }

  onChangedcardLimit(cardLimit:any,id:any)
  {
    this.id = localStorage.getItem('userId');
    var a = JSON.parse(JSON.stringify({cardLimit,id})) 
    this.cardService.setCardLimit(a)
    .subscribe((result) => {
    },
    (error) => {
      console.log(error);
      alert('Failed to load Data');
    });
  }

}
