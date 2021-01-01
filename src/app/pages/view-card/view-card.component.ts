import { CardService } from 'app/service/card.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {

  id: number;
  uid:any;
  cardType: string;
  cardLimit:any;
  private sub: any;
  userPdf: any;
  defaultTemplate: string;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.cardType = params['type'];
   });

   this.getUserPdfById();
  }

  getUserPdfById(){
    this.cardLimit=localStorage.getItem('cardLimit');
    this.cardService.getUserPdfById(this.id)
    .subscribe((result) => {
      this.userPdf = result;
      this.defaultTemplate = this.userPdf.defaultTemplate; 
      
    },
    (error) => {
      console.log(error);
      alert('Failed to load Card');
    });
  }

}
