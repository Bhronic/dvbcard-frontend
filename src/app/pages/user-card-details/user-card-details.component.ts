import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardDetails } from '../model/CardDetails';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card-details',
  templateUrl: './user-card-details.component.html',
  styleUrls: ['./user-card-details.component.scss']
})
export class UserCardDetailsComponent implements OnInit {

  cardDetails: CardDetails;
  cardDetailId: number;
  companyLogoChange: boolean = false;
  companyLogoFile: any;
  companyLogoUrl: any;
  qrCodeChange: boolean = false;
  qrCodeFile: any;
  qrCodeUrl: any;

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private router: Router,
    private cardService: CardService,
    private toastr: ToastrService
    ) { }

  cardDeatilsForm = new FormGroup({
    companyLogo: new FormControl(),
    companyName: new FormControl('' , [Validators.required]),
    contactNumber: new FormControl('',[Validators.required]),
    whatsappNumber: new FormControl('', [Validators.min(1000000000), Validators.max(9999999999)]),
    email: new FormControl('' , [Validators.required, Validators.pattern(this.emailPattern)]),
    website: new FormControl(),
    aboutUsType: new FormControl('url', [Validators.required]),
    aboutUs: new FormControl(),
    productsType: new FormControl('url', [Validators.required]),
    products: new FormControl(),
    location: new FormControl(),
    appointment: new FormControl(),
    testimony: new FormControl(),
    payMeName: new FormControl(),
    payMeNumber: new FormControl(),
    payMeCode: new FormControl(),
    facebook: new FormControl(),
    instagram: new FormControl(),
    linkedin: new FormControl(),
    youtube: new FormControl()
  });

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
    this.getCardDetailsByUserId();
  }

  getCardDetailsByUserId(){
    this.cardService.getCardDetailsByUserId()
    .subscribe((result) => {
      this.cardDetails = result[0];
      this.cardDetailId = this.cardDetails.id;
      this.companyLogoUrl = this.cardDetails.companyLogo;
      this.qrCodeUrl = this.cardDetails.qrCode;
      this.cardDeatilsForm.patchValue({
        //companyLogo: this.cardDetails.companyLogo,
        companyName: this.cardDetails.companyName,
        contactNumber: this.cardDetails.contactNumber,
        whatsappNumber: this.cardDetails.whatsappNumber,
        email: this.cardDetails.email,
        website: this.cardDetails.website,
        aboutUsType: this.cardDetails.aboutUsType,
        aboutUs: this.cardDetails.aboutUs,
        productsType: this.cardDetails.productsType,
        products: this.cardDetails.products,
        location: this.cardDetails.location,
        appointment: this.cardDetails.appointment,
        testimony: this.cardDetails.testimony,
        payMeName: this.cardDetails.payMeName,
        payMeNumber: this.cardDetails.payMeNumber,
        payMeCode: this.cardDetails.payMeCode,
        facebook: this.cardDetails.facebook,
        instagram: this.cardDetails.instagram,
        linkedin: this.cardDetails.linkedin,
        youtube: this.cardDetails.youtube
      });
    },
    (error) => {
      console.log(error);
    });
  }

    toast(msg){
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">' + msg + '</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'center'
          }
      );
    }

  onFileChange(event){
    this.companyLogoChange = true;
    this.companyLogoFile = event.target.files.item(0);
  }

  onQrCodeChange(event){
    this.qrCodeChange = true;
    this.qrCodeFile = event.target.files.item(0);
  }

  cardDetailsFormSave(){
    if(this.companyLogoFile && this.companyLogoChange){
      this.cardService.uploadFile(this.companyLogoFile)
      .subscribe((result) => {
        this.companyLogoUrl = result.fileDownloadUri;
        if(this.qrCodeFile && this.qrCodeChange){
          this.cardService.uploadFile(this.qrCodeFile)
          .subscribe((result) => {
            this.qrCodeUrl = result.fileDownloadUri;
            this.cardDetailsSave();
          },
          (error) => {
            alert("Error while uploading QR Code");
          });
        }
        else{
          this.cardDetailsSave();
        }
      },
      (error) => {
        alert("Error while uploading Company Logo");
      });
    }
    else{
      if(this.qrCodeFile && this.qrCodeChange){
        this.cardService.uploadFile(this.qrCodeFile)
        .subscribe((result) => {
          this.qrCodeUrl = result.fileDownloadUri;
          this.cardDetailsSave();
        },
        (error) => {
          alert("Error while uploading QR Code");
        });
      }
      else{
        this.cardDetailsSave();
      }
    }
  }

  cardDetailsSave(){
    this.cardDetails = this.cardDeatilsForm.value;
    this.cardDetails.id = this.cardDetailId;
    this.cardDetails.companyLogo = this.companyLogoUrl;
    this.cardDetails.qrCode = this.qrCodeUrl;
    this.cardDetails.facebook = this.cardDetails.facebook.split(' ').join('.');
    this.cardDetails.userId = +localStorage.getItem('userId');
    if(this.cardDetails.website){
      this.cardDetails.website = this.websiteCheck(this.cardDetails.website);
    }
    if(this.cardDetails.appointment){
      this.cardDetails.appointment = this.websiteCheck(this.cardDetails.appointment);
    }
    if(this.cardDetails.linkedin){
      this.cardDetails.linkedin = this.websiteCheck(this.cardDetails.linkedin);
    }
    if(this.cardDetails.youtube){
      this.cardDetails.youtube = this.websiteCheck(this.cardDetails.youtube);
    }
    if(this.cardDetails.aboutUsType == 'url' && this.cardDetails.aboutUs){
      this.cardDetails.aboutUs = this.websiteCheck(this.cardDetails.aboutUs);
    }
    if(this.cardDetails.productsType == 'url' && this.cardDetails.products){
      this.cardDetails.products = this.websiteCheck(this.cardDetails.products);
    }
    this.cardService.saveCardDetails(this.cardDetails)
    .subscribe((result) => {
      this.toast('Card Details Successfully Saved!!');
    },
    (error) => {
      this.toast('Fail to Save Card Details');
    });
  }

  websiteCheck(url){
    var start = url.substring(0,4);
    if(start == 'www.'){
      url = 'https://' + url;
    }
    return url;
  }

}
