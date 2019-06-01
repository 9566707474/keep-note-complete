import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginUser } from '../LoginUser';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitMessage: string;
  loginUser: LoginUser;
  username = new FormControl();
  password = new FormControl();

  constructor(private routerService: RouterService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
    this.submitMessage = '';
    this.loginUser = new LoginUser;
  }

  //get property to make easy to access the form controls on the HTML form
  get formControls() { return this.loginForm.controls; }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.submitMessage='';
    //implement login auth services
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      resp => {
        this.authService.setBearerToken(resp['token']);
        this.authService.setUserId(this.loginForm.value.userId);
        this.routerService.routeToDashboard();
      }, err => {
        this.submitMessage = err.message;
        if (err.status === 401) {
          this.submitMessage = 'Unauthorized';
        } else {
          this.submitMessage = 'Http failure response for http://localhost:8085/api/auth 404 Not Found';
        }
      }
    );
  }
}
