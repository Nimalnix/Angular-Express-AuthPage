import { Component } from '@angular/core';
import { BackendAccessService } from '../backend-access.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userList:any=[];
  getUserList:any=[];
  data:any;
  username:string="";
  password:string="";
  email:string="";
 
  constructor(private http : HttpClient, private backendaccessService: BackendAccessService) {
  }
  getUsers(){
    this.userList=this.backendaccessService.getUsers();    
  }
 
  addUser(userForm:any){
    this.data=this.backendaccessService.addUser(userForm);
  }
 
  updateUser(userForm:any){
    this.backendaccessService.updateUser(userForm);
  }
 
  deleteUser(userForm:any){
    this.backendaccessService.deleteUser(userForm);
  }
  addUserCredentials(passwordForm:any){
    console.log(passwordForm.value);
    this.backendaccessService.addUserCredentials(passwordForm);
  }
}
