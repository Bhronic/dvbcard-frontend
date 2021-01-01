import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent implements OnInit {

  ckeditorContent = "hello everyone";

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
  }

}
