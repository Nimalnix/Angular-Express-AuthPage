import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendAccessService } from './backend-access.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userList: any=[];

  constructor(private http : HttpClient, private backendaccessService: BackendAccessService,private router: Router) {}
  private authenticated = false;

  signIn(signInForm:any) {
    // Add your authentication logic here.
    // This is where you would typically call an API to authenticate the user.
    // For this example, we'll just set authenticated to true.

    this.userList=this.backendaccessService.getUser(signInForm);
    if(this.userList[0].email == signInForm.value.email && this.userList[0].password == signInForm.value.password){
      this.authenticated = true;
      this.router.navigate(['/home']);
    }
    else
      this.authenticated = false;
  }

  signOut() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
