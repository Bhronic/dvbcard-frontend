import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})

export class TypographyComponent{

  constructor(private router: Router){}

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
  }

}
