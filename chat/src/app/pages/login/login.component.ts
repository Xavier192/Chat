//Services
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';
import {LoadingService} from '../../services/loading.service';
//Classes
import {Alert} from '../../classes/alert';
//Enums
import {AlertType} from '../../enums/alert-type.enum';
//Packages
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//Libraries
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private subscriptions: Subscription[]=[];
  private returnUrl: string;

  constructor(
     private fb: FormBuilder,
     private alertService: AlertService,
     private loadingService:LoadingService,
     private auth: AuthService,
     private router: Router,
     private route: ActivatedRoute) {
  
     this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';//Link to the chat
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      //Email is required and has to be valid.
      email: ['', [Validators.required, Validators.email]],
      //Password has to have 8 characters minimun and its required.
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
 

  public submit(): void {//When submit button is pressed.
    //If loginForm is valid see createForm to know the criteria.
    if (this.loginForm.valid) {
      this.loadingService.isLoading.next(true);
    const {email, password} = this.loginForm.value;

    this.subscriptions.push(//Add object to the suscriptions array.
      this.auth.login(email, password).subscribe(success => {
        if (success) {//If login has sucess
          this.router.navigateByUrl(this.returnUrl);
        }else{//If login doesn't have sucess.
          this.displayFailedLogin();//Displays a red alert
        }
        this.loadingService.isLoading.next(false);
      })
    );
  }else {//If loginForm is not valid
    //Don't display load screen.
    this.loadingService.isLoading.next(false);
    this.displayFailedLogin();// Display failed alert.
  }  
 }

 private displayFailedLogin(): void {
  //Save failed alert into a const.
  const failedLoginAlert = 
  new Alert('Invalid email/password combination, try again.', 
  AlertType.Danger);
  //Display failed alert.
  this.alertService.alerts.next(failedLoginAlert);
 }
 
 ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
 }
 
}
