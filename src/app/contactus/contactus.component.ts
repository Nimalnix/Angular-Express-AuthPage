import { Component } from '@angular/core';
import { BackendAccessService } from '.././backend-access.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  title = 'reactiveforms';
  contactList:any=[];
  expresponse:string="";
 
 
  constructor(private http:HttpClient, private baccess:BackendAccessService){
  }
  getAllContact(){
      this.contactList=this.baccess.getAllContact();
    }
 
 addContact(cdata:any){
  console.log(cdata.value);
    this.contactList=this.baccess.addContact(cdata);
  }
  updateContact(cdata:any){
   
   this.baccess.updateContact(cdata);

  }
  deleteContact(cdata:any){
    this.baccess.deleteContact(cdata);
  }
}
