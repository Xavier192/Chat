//packages
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//Libraries
import {Subscription} from 'rxjs';
//Services
import {LoadingService} from '../../services/loading.service';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';
//enums
import {AlertType} from '../../enums/alert-type.enum';
//Classes
import {Alert} from '../../classes/alert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
public signupForm: FormGroup;
private subscriptions: Subscription[]=[];
private returnUrl: string;

  constructor(
    private fb: FormBuilder,
     private alertService: AlertService,
     private loadingService:LoadingService,
     private auth: AuthService,
     private router: Router,
     private route: ActivatedRoute) {

  this.createForm();//Creates sign-up form
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';//Link to the chat
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
   }

  private createForm(): void {
    this.signupForm = this.fb.group({//Create form
      //This field has to have text.
      firstName: ['', [Validators.required]],
      //This field has to have text.
      lastName: ['', [Validators.required]],
      //This field has to have text and also the email has to be valid.
      email: ['', [Validators.required, Validators.email]],
      //Min length of the text has to be 8 characters and it's required
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
 

  public submit(): void {
    
    if (this.signupForm.valid) {//If the form is valid
    //Get the info from the form and store into a const.
    const {firstName, lastName, email, password} = this.signupForm.value;
    //Add an object to the array of suscriptions
    this.subscriptions.push(
      //Push all formulary data to firebase.
      this.auth.signup(firstName,lastName,email, password).subscribe(success => {
        if (success) {//If autentification is correct.
          this.router.navigateByUrl(this.returnUrl);//Go to chat page
        }
        this.loadingService.isLoading.next(false);//
      })
    );
  }else {//If autentification fails show error alert.
    const failedLoginAlert = new Alert
    ('Your email or password were invalid, try again',AlertType.Danger);
    this.loadingService.isLoading.next(false);
    this.alertService.alerts.next(failedLoginAlert);
  }
 }
}
