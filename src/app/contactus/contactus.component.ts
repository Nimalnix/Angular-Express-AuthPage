import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendAccessService } from '.././backend-access.service';
 
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  title = 'reactiveforms';
  contactList:any=[];
  userList:any=[];
  expresponse:string="";
 
 
  constructor(private http:HttpClient, private baccess:BackendAccessService){
  }
  getallcontact(){
      this.contactList=this.baccess.getallcontact();
    }
 
    addcontact(cdata:any){
    this.expresponse=this.baccess.addcontact(cdata);
   
  }
 
 
}