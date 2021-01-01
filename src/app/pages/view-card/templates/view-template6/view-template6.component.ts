import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'app/service/card.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-template6',
  templateUrl: './view-template6.component.html',
  styleUrls: ['./view-template6.component.scss']
})
export class ViewTemplate6Component implements OnInit {

  @Input() id: number;
  @Input() cardType: string;

  userPdf: any;
  userRole: any;
  cardDetails: any;

  companyLogoBase64: any;
  profileImageBase64: any;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    if(this.cardType == 'ecard'){
      this.getUserPdfById();
    }
    else if(this.cardType == 'bcard'){
      this.getUserPdfById2();
    }
  }

  getUserPdfById(){
    this.cardService.getUserPdfById(this.id)
    .subscribe((result) => {
      this.userPdf = result;
      this.cardService.getRoleByRoleId(this.userPdf.roleId)
      .subscribe((result) => {
        this.userRole = result;
        this.cardService.getCardDetailsByUserId2(this.userPdf.userId)
        .subscribe((result) => {
          this.cardDetails = result[0];
          this.getBase64ImageFromUrl(this.cardDetails.companyLogo)
          .then(result => this.companyLogoBase64 = result)
          .catch(err => console.error());
        },
        (error) => {
          alert('Failed to load');
        });
      },
      (error) => {
        alert('Failed to load');
      });
      this.getBase64ImageFromUrl(this.userPdf.profileImage)
      .then(result => this.profileImageBase64 = result)
      .catch(err => console.error());
    },
    (error) => {
      console.log(error);
      alert('Failed to load Card');
    });
  }

  getUserPdfById2(){
    this.cardService.getUserPdfById(this.id)
    .subscribe((result: any) => {
      this.userPdf = result
      this.cardService.getCardDetailsByUserId2(this.userPdf.userId)
      .subscribe((result) => {
        this.cardDetails = result[0];
        this.getBase64ImageFromUrl(this.cardDetails?.companyLogo)
        .then(result => this.companyLogoBase64 = result)
        .catch(err => console.error());
      },
      (error) => {
        alert('Failed to load');
      });
    });
  }

  async getBase64ImageFromUrl(companyLogo) {
    var res = await fetch(companyLogo);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  download(){
    var element = document.getElementById('user');

    var height = document.getElementById('button-container').offsetTop + document.getElementById('row').offsetTop;
    var width = document.getElementById('button-container').offsetLeft + document.getElementById('row').offsetLeft;
    window.scrollTo(0,0);

    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');

      var docWidth = document.getElementById('user').offsetWidth * 0.2645833;
      var docHeight = document.getElementById('user').offsetHeight * 0.2645833;
      console.log(docWidth);
      console.log(docHeight);
      var doc = new jsPDF("p", "mm", [docWidth, docHeight]);
      const imgProps= doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      console.log(pdfWidth);
      console.log(pdfHeight);
      //const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', -2.5, 0, pdfWidth+3, pdfHeight);

      if((this.cardDetails?.contactNumber && this.cardType == 'bcard') || (this.userRole?.contactNumber == 'yes' && this.cardType == 'ecard')){
        var callx = width + document.getElementById('call').offsetLeft;
        var cally = document.getElementById('call').offsetTop;
        doc.link(callx * 0.2645833, cally * 0.2645833, 10, 15, {url: 'tel:91' + this.cardDetails.contactNumber});
      }

      if((this.cardDetails?.whatsappNumber && this.cardType == 'bcard') || (this.userRole?.whatsappNumber == 'yes' && this.cardType == 'ecard')){
        var whatsappx = width + document.getElementById('whatsapp').offsetLeft;
        var whatsappy = document.getElementById('whatsapp').offsetTop;
        doc.link(whatsappx * 0.2645833, whatsappy * 0.2645833, 10, 15, {url: 'https://wa.me/91' + this.cardDetails.whatsappNumber + "?text=Got%20reference%20from%20your%20Business%20Card"});
      }

      if((this.cardDetails?.email && this.cardType == 'bcard') || (this.userRole?.email == 'yes' && this.cardType == 'ecard')){
        var emailx = width + document.getElementById('email').offsetLeft;
        var emaily = document.getElementById('email').offsetTop;
        doc.link(emailx * 0.2645833, emaily * 0.2645833, 10, 15, {url: 'mailto:' + this.cardDetails.email});
      }

      if((this.cardDetails?.website && this.cardType == 'bcard') || (this.userRole?.website == 'yes' && this.cardType == 'ecard')){
        var websitex = width + document.getElementById('website').offsetLeft;
        var websitey = document.getElementById('website').offsetTop;
        doc.link(websitex * 0.2645833, websitey * 0.2645833, 10, 15, {url: 'https://' + this.cardDetails.website});
      }

      if((this.cardDetails?.aboutUs && this.cardType == 'bcard') || (this.userRole?.aboutUs == 'yes' && this.cardType == 'ecard')){
        var aboutusx = width + document.getElementById('aboutus').offsetLeft;
        var aboutusy = document.getElementById('aboutus').offsetTop;
        doc.link(aboutusx * 0.2645833, aboutusy * 0.2645833, 10, 15, {url: 'https://' + this.cardDetails.aboutUs});
      }

      if((this.cardDetails?.products && this.cardType == 'bcard') || (this.userRole?.products == 'yes' && this.cardType == 'ecard')){
        var productsx = width + document.getElementById('products').offsetLeft;
        var productsy = document.getElementById('products').offsetTop;
        doc.link(productsx * 0.2645833, productsy * 0.2645833, 10, 15, {url: 'https://' + this.cardDetails.products});
      }

      if((this.cardDetails?.location && this.cardType == 'bcard') || (this.userRole?.location == 'yes' && this.cardType == 'ecard')){
        var locationx = width + document.getElementById('location').offsetLeft;
        var locationy = document.getElementById('location').offsetTop;
        doc.link(locationx * 0.2645833, locationy * 0.2645833, 10, 15, {url: 'https://' + this.cardDetails.location});
      }

      if((this.cardDetails?.appointment && this.cardType == 'bcard') || (this.userRole?.appointment == 'yes' && this.cardType == 'ecard')){
        var appointmentx = width + document.getElementById('appointment').offsetLeft;
        var appointmenty = document.getElementById('appointment').offsetTop;
        doc.link(appointmentx * 0.2645833, appointmenty * 0.2645833, 10, 15, {url: this.cardDetails.appointment});
      }

      if((this.cardDetails?.testimony && this.cardType == 'bcard') || (this.userRole?.testimony == 'yes' && this.cardType == 'ecard')){
        var testimonyx = width + document.getElementById('testimony').offsetLeft;
        var testimonyy = document.getElementById('testimony').offsetTop;
        doc.link(testimonyx * 0.2645833, testimonyy * 0.2645833, 10, 15, {url: 'https://' + this.cardDetails.testimony});
      }

      // if(this.cardDetails?.contactNumber && this.cardType == 'bcard') || (this.userRole?.payMeName &&(this.cardDetails?.contactNumber && this.cardType == 'bcard') ||  this.userRole?.payMeNumber &&(this.cardDetails?.contactNumber && this.cardType == 'bcard') ||  this.userRole?.payMeCode){
      //   var paymex = width + document.getElementById('payme').offsetLeft;
      //   var paymey = document.getElementById('payme').offsetTop;
      //   //doc.link(paymex * 0.2645833, paymey * 0.2645833, 10, 15, {url: 'https://' + this.userPdf.payMe});
      // }

      if((this.cardDetails?.facebook && this.cardType == 'bcard') || (this.userRole?.facebook == 'yes' && this.cardType == 'ecard')){
        var facebookx = width + document.getElementById('facebook').offsetLeft;
        var facebooky = document.getElementById('facebook').offsetTop;
        doc.link(facebookx * 0.2645833, facebooky * 0.2645833, 10, 15, {url: 'https://m.facebook.com/' + this.cardDetails.facebook});
      }

      if((this.cardDetails?.instagram && this.cardType == 'bcard') || (this.userRole?.instagram == 'yes' && this.cardType == 'ecard')){
        var instagramx = width + document.getElementById('instagram').offsetLeft;
        var instagramy = document.getElementById('instagram').offsetTop;
        doc.link(instagramx * 0.2645833, instagramy * 0.2645833, 10, 15, {url: 'https://www.instagram.com/' + this.cardDetails.instagram});
      }

      if((this.cardDetails?.linkedin && this.cardType == 'bcard') || (this.userRole?.linkedin == 'yes' && this.cardType == 'ecard')){
        var linkedinx = width + document.getElementById('linkedin').offsetLeft;
        var linkediny = document.getElementById('linkedin').offsetTop;
        doc.link(linkedinx * 0.2645833, linkediny * 0.2645833, 10, 15, {url:  this.cardDetails.linkedin});
      }

      if((this.cardDetails?.youtube && this.cardType == 'bcard') || (this.userRole?.youtube == 'yes' && this.cardType == 'ecard')){
        var youtubex = width + document.getElementById('youtube').offsetLeft;
        var youtubey = document.getElementById('youtube').offsetTop;
        doc.link(youtubex * 0.2645833, youtubey * 0.2645833, 10, 15, {url:  this.cardDetails.youtube});
      }
      if(this.cardType == 'ecard'){
        doc.save(this.userPdf.firstName + " " + this.userPdf.lastName + ".pdf");
      }
      else{
        doc.save(this.cardDetails.companyName + " (Business Card).pdf");
      }
    });
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
