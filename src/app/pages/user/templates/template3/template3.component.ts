import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardDetails } from 'app/pages/model/CardDetails';
import { Roles } from 'app/pages/model/Roles';
import { UserPdf } from 'app/pages/model/UserPdf';
import { CardService } from 'app/service/card.service';

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.scss']
})
export class Template3Component implements OnInit {

  @Input() templateType: string;
  @Input() lockTemplate: number;

  roles: any;
  rolesEmpty: boolean = true;
  selectedRole: string;
  selectedRoleValue: Roles;
uid:any;
  userPdf: UserPdf;

  cardDetails: CardDetails = new CardDetails();
  companyName: string;

  profileImageChange: boolean = false;
  profileImageFile: any;
  profileImageUrl: any;

  imageSrc: any;

  isSubmit: boolean = false;
  companyLogoBase64;

  bgImageSrc: any = null;
  bgImgFile: any;
  bgImgUrl: string;

  cardType: string;

  constructor(
    private router: Router,
    private cardService: CardService
    ) { }

  usersaveform = new FormGroup({
    backgroundImage: new FormControl(),
    profileImage:new FormControl('' , [Validators.required]),
    firstName:new FormControl('' , [Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    cardUserRole:new FormControl('default' , [Validators.required])
  });

  ngOnInit(){
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
    this.cardType = this.templateType;
    this.getRolesByUserId();
    this.getCardDetailsByUserId();
  }

  changeTemplate(){
    this.router.navigate(['select-template']);
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

  getCardDetailsByUserId(){
    this.cardService.getCardDetailsByUserId()
    .subscribe((result) => {
      this.cardDetails = result[0];
      this.companyName = this.cardDetails.companyName;
      if(this.cardDetails.companyLogo){
        this.getBase64ImageFromUrl(this.cardDetails.companyLogo)
        .then(result => this.companyLogoBase64 = result)
        .catch(err => console.error(err));
      }
    },
    (error) => {
      console.log(error);
    });
  }

  getRolesByUserId(){
    this.cardService.getRolesByUserId()
    .subscribe((result) => {
      this.roles = result;
      if(!this.roles){
        this.rolesEmpty = true;
      }
      else{
        this.rolesEmpty = false;
      }
    },
    (error) => {
      this.rolesEmpty = true;
      console.log(error);
      alert('Failed to load Roles');
    });
  }

  roleChange(event){
    this.selectedRole = event.target.value;
    this.selectedRoleValue = new Roles();
    this.selectedRoleValue = this.roles.find( ({ cardUserRole }) => cardUserRole == this.selectedRole );
  }

  onFileChange(event){
    this.profileImageChange = true;
    this.profileImageFile = event.target.files.item(0);

    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onBgChange(event){
    this.bgImgFile = event.target.files.item(0);

    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.bgImageSrc = reader.result as string;
      };
    }
  }

  userFormEdit(){
    this.isSubmit = false;
  }

  cardTypeChange(event){
    this.cardType = event.target.value;
  }

  save(){
    if(this.imageSrc && this.profileImageChange){
      this.cardService.uploadFile(this.profileImageFile)
      .subscribe((result) => {
        this.profileImageUrl = result.fileDownloadUri;
        this.cardService.uploadFile(this.bgImgFile)
        .subscribe((result1) =>{
          this.bgImgUrl = result1.fileDownloadUri;
          this.isSubmit = true;
          this.userPdfSave();
        },
        (error1) => {
          console.log(error1);
        });
      },
      (error) => {
        alert("error while uploading file details");
        console.log(error);
      });
    }
    else{
      this.userPdfSave();
    }
  }

  userPdfSave(){
    this.cardService.lockTemplate()
    .subscribe(() => {});
    this.userPdf = new UserPdf();
    this.userPdf.userId = +localStorage.getItem('userId');
    this.userPdf.defaultTemplate = 'template3';
    this.userPdf.firstName = this.usersaveform.controls.firstName.value;
    this.userPdf.lastName = this.usersaveform.controls.lastName.value;
    this.userPdf.cardType = this.cardType;
    if(this.cardType == 'ecard'){
      this.userPdf.backgroundImage = this.bgImgUrl;
      this.userPdf.profileImage = this.profileImageUrl;
      this.userPdf.roleId = this.selectedRoleValue.id;
      this.cardService.saveUserPdf(this.userPdf)
      .subscribe((result) => {
        var response: any = result;
        this.cardService.updateCardLimit(this.uid)
            .subscribe((result) => {
            },
              (error) => {
                console.log(error);
                alert('Failed to load Data');
              });

        this.router.navigate(['view-card/' + response.id + '/' + this.cardType]);
      },
      (error) => {
        alert('Fail to Save Card Details');
      });
    }
    else if(this.cardType == 'bcard'){
      this.cardService.uploadFile(this.bgImgFile)
      .subscribe((result1) =>{
        this.bgImgUrl = result1.fileDownloadUri;
        this.userPdf.backgroundImage = this.bgImgUrl;
        this.cardService.getUserPdfByUserIdAndCardType(this.userPdf.userId, this.cardType)
        .subscribe((result: any) => {
          if(result){
            this.userPdf.id = result.id;
            this.cardService.saveUserPdf(this.userPdf)
            .subscribe((result) => {
              var response: any = result;
              this.router.navigate(['view-card/' + response.id + '/' + this.cardType]);
            },
            (error) => {
              alert('Fail to Save Card Details');
            });
          }
          else{
            this.cardService.saveUserPdf(this.userPdf)
            .subscribe((result) => {
              var response: any = result;
              this.router.navigate(['view-card/' + response.id + '/' + this.cardType]);
            },
            (error) => {
              alert('Fail to Save Card Details');
            });
          }
        });
      },
      (error1) => {
        console.log(error1);
      });
    }
  }

}
