import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/";

  signUp(registerDetails) {
    return this.http.post(this.url + 'auth/signup', registerDetails);
  }
  setCardLimit(cardlimit: any) {
    return this.http.post(this.url + 'auth/setCardLimit', cardlimit);
  }

  signIn(loginDetails) {
    return this.http.post(this.url + 'auth/signin', loginDetails);
  }

  getUserById() {
    return this.http.get(this.url + 'auth/getUserById/' + localStorage.getItem('userId'));
  }

  lockTemplate() {
    return this.http.post(this.url + 'auth/lockTemplate/' + localStorage.getItem('userId'), '');
  }

  setBusinessCard(id: any) {
    return this.http.post(this.url + 'auth/setBusinessCard/' + id, '');
  }
  setEmployeeCard(id: any) {
    return this.http.post(this.url + 'auth/setEmployeeCard/' + id, '');
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.url + 'auth/getusers');
  }

  editUser(user) {
    return this.http.post(this.url + 'auth/editUser', user);
  }
  updateCardLimit(id:any) {
    return this.http.post(this.url + 'auth/updateCardLimit/' + id, '');
  }
  getCardLimitById(id:any)
  {
    return this.http.get(this.url + 'auth/getCardLimitById/' + id);

  }

  deleteUserById(id: number) {
    return this.http.post(this.url + 'auth/deleteuser/' + id, '');
  }

  getCardDetailsByUserId() {
    return this.http.get(this.url + 'carduser/getCardUserByUserId/' + localStorage.getItem('userId'));
  }

  getCardDetailsByUserId2(userId) {
    return this.http.get(this.url + 'carduser/getCardUserByUserId/' + userId);
  }

  saveCardDetails(cardDetails) {
    return this.http.post(this.url + 'carduser/createuser', cardDetails);
  }

  getRolesByUserId() {
    return this.http.get(this.url + 'carduser/getAllCardUserRoleById/' + localStorage.getItem('userId'));
  }

  addRole(roleDetails) {
    return this.http.post(this.url + 'carduser/addCardRole', roleDetails);
  }

  getRoleByRoleId(roleId) {
    return this.http.get(this.url + 'carduser/getCardUserRoleById/' + roleId);
  }

  saveUserPdf(userPdf) {
    return this.http.post(this.url + 'carddetails/saveCardDetails', userPdf);
  }

  getUserPdfById(id) {
    return this.http.get(this.url + 'carddetails/getCardUserById/' + id);
  }

  deleteUserPdfById(id) {
    return this.http.post(this.url + 'carddetails/deleteCardDetails/' + id, '');
  }

  getAllUserPdfByUserId() {
    return this.http.get(this.url + 'carddetails/getAllCardUser/' + localStorage.getItem('userId'));
  }

  getUserPdfByUserIdAndCardType(userId, cardType) {
    return this.http.get(this.url + 'carddetails/getCardUserByUserIdAndCardType/' + userId + '/' + cardType);
  }

  uploadFile(file: File): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(this.url + 'carduser/uploadFile', formdata);
  }

}
