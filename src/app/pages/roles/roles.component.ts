import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardService } from './../../service/card.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Roles } from '../model/Roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: any;
  rolesEmpty: boolean = true;
  selectedRole: string;
  selectedRoleValue: Roles;
  addRole: boolean = false;

  roleSelectBox = new FormControl('default');

  rolesForm = new FormGroup({
    cardUserRole: new FormControl('', Validators.required),
    companyLogo: new FormControl(),
    companyName: new FormControl(),
    contactNumber: new FormControl(),
    whatsappNumber: new FormControl(),
    email: new FormControl(),
    website: new FormControl(),
    aboutUs: new FormControl(),
    products: new FormControl(),
    location: new FormControl(''),
    appointment: new FormControl(),
    testimony: new FormControl(),
    payMe: new FormControl(),
    facebook: new FormControl(),
    instagram: new FormControl(),
    linkedin: new FormControl(),
    youtube: new FormControl()
  });

  constructor(
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('userId') && !localStorage.getItem('userEmail')){
      this.router.navigate(['login']);
    }
    this.getRolesByUserId();
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

  changeAddRole(flag){
    this.addRole = flag;
    this.selectedRole = '';
    this.roleSelectBox.reset('default');
    //this.rolesForm.reset();
    this.selectedRoleValue = new Roles();
  }

  save(){
    this.selectedRoleValue.userId = +localStorage.getItem('userId');
    this.cardService.addRole(this.selectedRoleValue)
    .subscribe((result) => {
      console.log(result);
      this.changeAddRole(false);
      this.getRolesByUserId();
    },
    (error) => {
      console.log(error);
      alert('Failed to save Role');
    });
  }

  companyNameChange(){
    if(this.selectedRoleValue.companyName == 'yes'){
      this.selectedRoleValue.companyName = 'no';
    }
    else{
      this.selectedRoleValue.companyName = 'yes';
    }
  }

  companyLogoChange(){
    if(this.selectedRoleValue.companyLogo == 'yes'){
      this.selectedRoleValue.companyLogo = 'no';
    }
    else{
      this.selectedRoleValue.companyLogo = 'yes';
    }
  }

  contactNumberChange(){
    if(this.selectedRoleValue.contactNumber == 'yes'){
      this.selectedRoleValue.contactNumber = 'no';
    }
    else{
      this.selectedRoleValue.contactNumber = 'yes';
    }
  }

  whatsappNumberChange(){
    if(this.selectedRoleValue.whatsappNumber == 'yes'){
      this.selectedRoleValue.whatsappNumber = 'no';
    }
    else{
      this.selectedRoleValue.whatsappNumber = 'yes';
    }
  }

  emailChange(){
    if(this.selectedRoleValue.email == 'yes'){
      this.selectedRoleValue.email = 'no';
    }
    else{
      this.selectedRoleValue.email = 'yes';
    }
  }

  websiteChange(){
    if(this.selectedRoleValue.website == 'yes'){
      this.selectedRoleValue.website = 'no';
    }
    else{
      this.selectedRoleValue.website = 'yes';
    }
  }

  aboutUsChange(){
    if(this.selectedRoleValue.aboutUs == 'yes'){
      this.selectedRoleValue.aboutUs = 'no';
    }
    else{
      this.selectedRoleValue.aboutUs = 'yes';
    }
  }

  productsChange(){
    if(this.selectedRoleValue.products == 'yes'){
      this.selectedRoleValue.products = 'no';
    }
    else{
      this.selectedRoleValue.products = 'yes';
    }
  }

  locationChange(){
    if(this.selectedRoleValue.location == 'yes'){
      this.selectedRoleValue.location = 'no';
    }
    else{
      this.selectedRoleValue.location = 'yes';
    }
  }

  appointmentChange(){
    if(this.selectedRoleValue.appointment == 'yes'){
      this.selectedRoleValue.appointment = 'no';
    }
    else{
      this.selectedRoleValue.appointment = 'yes';
    }
  }

  testimonyChange(){
    if(this.selectedRoleValue.testimony == 'yes'){
      this.selectedRoleValue.testimony = 'no';
    }
    else{
      this.selectedRoleValue.testimony = 'yes';
    }
  }

  payMeChange(){
    if(this.selectedRoleValue.payMe == 'yes'){
      this.selectedRoleValue.payMe = 'no';
    }
    else{
      this.selectedRoleValue.payMe = 'yes';
    }
  }

  facebookChange(){
    if(this.selectedRoleValue.facebook == 'yes'){
      this.selectedRoleValue.facebook = 'no';
    }
    else{
      this.selectedRoleValue.facebook = 'yes';
    }
  }

  instagramChange(){
    if(this.selectedRoleValue.instagram == 'yes'){
      this.selectedRoleValue.instagram = 'no';
    }
    else{
      this.selectedRoleValue.instagram = 'yes';
    }
  }

  linkedinChange(){
    if(this.selectedRoleValue.linkedin == 'yes'){
      this.selectedRoleValue.linkedin = 'no';
    }
    else{
      this.selectedRoleValue.linkedin = 'yes';
    }
  }

  youtubeChange(){
    if(this.selectedRoleValue.youtube == 'yes'){
      this.selectedRoleValue.youtube = 'no';
    }
    else{
      this.selectedRoleValue.youtube = 'yes';
    }
  }

}
