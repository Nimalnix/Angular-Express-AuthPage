import { Component } from '@angular/core';
// import { FormGroup  } from '@angular/forms';
// import { FormControl  } from '@angular/forms';
// import { Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { BackendAccessService } from './backend-access.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';
}
