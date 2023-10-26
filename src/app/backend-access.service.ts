import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendAccessService {
  userList: any = [];
  signInList:any=[];
  contactList: any = [];
  data: any;
  getUserList: any = [];

  expresponse: string = "";

  constructor(private httpClient: HttpClient) { }


  getUsers() {
    this.httpClient.get('http://localhost:5051/getAllUsers').subscribe(data => {
      this.userList = data;
    })
    console.log(this.userList);
    return this.userList;
  }

  addUser(userForm: any) {
    this.httpClient.post('http://localhost:5051/insertuser', userForm.value).subscribe(data => {
      this.data = data;
    })
    return (this.data);
  }

  updateUser(userForm: any) {
    console.log(userForm.value);
    this.httpClient.put('http://localhost:5051/updateuser', userForm.value).subscribe(data => {
      console.log(data);
    })
  }
  deleteUser(userForm: any) {
    this.httpClient.delete(`http://localhost:5051/deleteuser?email=${userForm.value.email}`).subscribe(data => {
      console.log(data);
    })
  }
  // getUser(userForm:any){
  //   this.httpClient.get(`http://localhost:5051/getUserById?uid=${userForm.value.username}`).subscribe(data => {
  //     this.getUserList=data;
  //     this.username=this.getUserList[0].UserName;
  //     this.password=this.getUserList[0].Password;
  //     this.email=this.getUserList[0].emailId;
  //   })
  // }
  getallcontact() {
    this.httpClient.get('http://localhost:5051/getallcontact').subscribe((response) => {
      this.contactList = response;
      console.log(this.contactList);

    });
    return this.contactList;
  }
  addcontact(cdata: any): any {

    // console.log(udata);
    //console.log(udata.value);
    //this.userList.push(udata.value);
    this.httpClient.post('http://localhost:5051/addcontact', cdata.value).subscribe((response) => {
      this.expresponse = response.toString();
      return this.expresponse;
    });
  }
  getUser(signInForm: any):any {
    this.httpClient.get(`http://localhost:5051/getuserbyemail?email=${signInForm.value.email}`).subscribe(data => {
      this.signInList = data;
    })
    console.log(this.signInList);
    return this.signInList;
  }
  addUserCredentials(passwordForm:any){
    this.httpClient.post('http://localhost:5051/insertusercredentials', passwordForm.value).subscribe(data => {
      this.data = data;
    })
    return (this.data);
  }
}