import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

  usersPdf: any;
  loading: boolean = false;
  bcard: any;

  constructor(
    private router: Router,
    private cardService: CardService
  ){}

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }

    this.getAllUserPdfByUserId();
  }

  getAllUserPdfByUserId(){
    this.cardService.getAllUserPdfByUserId()
    .subscribe((result) => {
      this.usersPdf = result;
      this.usersPdf.forEach(element => {
        if(element.cardType == 'ecard'){
          this.cardService.getRoleByRoleId(element.roleId)
          .subscribe((result: any) => {
            element.cardUserRole = result.cardUserRole;
          },
          (error) => {
            alert('Failed to load Role');
          });
        }
        else if(element.cardType == 'bcard'){
          this.bcard = element;
        }
      });
    },
    (error) => {
      console.log(error);
      alert('Failed to load Data');
    });
  }

  deleteUserPdfById(id){
    this.loading = true;
    this.cardService.deleteUserPdfById(id)
    .subscribe((result) => {
      this.getAllUserPdfByUserId();
      this.loading = false;
    },
    (error) => {
      console.log(error);
      alert('Failed to delete');
      this.loading = false;
    });
  }

  viewUserPdfById(id, type){
    this.router.navigate(['view-card/' + id + '/' + type]);
  }

}
