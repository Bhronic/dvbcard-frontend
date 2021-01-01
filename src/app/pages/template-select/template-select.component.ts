import { User } from './../model/User';
import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-select',
  templateUrl: './template-select.component.html',
  styleUrls: ['./template-select.component.scss']
})
export class TemplateSelectComponent implements OnInit {

  @Input() templateType: string;

  public enableEmployeeTab :any;

  templates: any = [
    {
      name: 'Multicolor Background',
      photo: 'template1'
    },
    {
      name: 'Custom Color',
      photo: 'template2'
    },
    {
      name: 'Custom Image',
      photo: 'template3'
    },
    {
      name: 'Radial Gradient',
      photo: 'template4'
    },
    {
      name: 'Fixed Background 1',
      photo: 'template5'
    },
    {
      name: 'Fixed Background 2',
      photo: 'template6'
    },
    {
      name: 'Vertical Gradient',
      photo: 'template7'
    },
    {
      name: 'Horizontal Gradient',
      photo: 'template8'
    },
    {
      name: 'Angle Gradient',
      photo: 'template9'
    },
  ];

  selectedTab: string = 'ecard';

  defaultTemplate: string;
  defaultTemplateb: string;

  constructor(
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
    this.enableEmployeeTab = localStorage.getItem('activeEmployeeCard')
    console.log(this.enableEmployeeTab);
  }

  changeTab(tab){
    this.selectedTab = tab;
  }

  selectTemplate(defaultTemplate){
    if(this.selectedTab == 'ecard'){
      this.defaultTemplate = defaultTemplate;
      this.defaultTemplateb = null;
    }
    else if(this.selectedTab == 'bcard'){
      this.defaultTemplateb = defaultTemplate;
      this.defaultTemplate = null;
    }
  }

  save(){
    var user = new User();
    user.id = +localStorage.getItem('userId');
    user.templateType = this.selectedTab;
    if(this.selectedTab == 'ecard'){
      user.defaultTemplate = this.defaultTemplate;
    }
    else if(this.selectedTab == 'bcard'){
      user.defaultTemplate = this.defaultTemplateb;
    }
    this.cardService.editUser(user)
    .subscribe((result) => {
      localStorage.setItem('defaultTemplate', this.defaultTemplate);
      localStorage.setItem('templateType', this.selectedTab);
      this.router.navigate(['user']);
    },
    (error) => {
      alert('Failed');
      console.log(error);
    });
  }

}
