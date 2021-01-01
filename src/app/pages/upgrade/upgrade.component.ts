import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'upgrade.component.html'
})

export class UpgradeComponent implements OnInit{

  constructor(private router: Router){}

    ngOnInit(){
      if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
        this.router.navigate(['login']);
      }
    }
}
