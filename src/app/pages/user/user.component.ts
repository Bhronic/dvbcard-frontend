import { CardService } from 'app/service/card.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{

  defaultTemplate: string;
  templateType: string;
  lockTemplate: number;

  constructor(
    private router: Router,
    private cardService: CardService
    ) { }

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }

    this.getUserById();
   }

   getUserById(){
     this.cardService.getUserById()
     .subscribe((result: User) => {
       this.defaultTemplate = result.defaultTemplate;
       this.templateType = result.templateType;
       this.lockTemplate = result.lockTemplate;
     },
     (error) => {
       alert('Failed to load');
     });
   }

}
