import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html'
})

export class IconsComponent{

  constructor(private router: Router){}

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
  }

}
