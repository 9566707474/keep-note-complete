import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { LoginUser } from '../LoginUser';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      userId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    // implement login user services
    let register = new LoginUser();
    register.userId = this.registerForm.value.userId;
    register.password = this.registerForm.value.password;
    this.registerUser(register);
    this.loading = false;
    this.submitted=false;
  }

  registerUser(data: any) {
    this.authService.registerUser(data).subscribe(
      resp => {
        if (resp) {
          this.loginUser(data);
          this.saveUserInfo(this.registerForm.value);
        }
        this.authService.setBearerToken(resp['token']);
        this.authService.setUserId(this.registerForm.value.userId);
      }, err => {
        this.alertService.error(data.userId  +  ' exists. Try with some other user name');
        err.message;
      }
    );
  }

  saveUserInfo(data: any) {
    this.userService.saveUser(data).subscribe(
      result => {
        //successfull
        this.registerForm.reset();
        this.authService.logout();
        this.alertService.success('Registered successfully!');
      }, err => {
        this.alertService.success(err.message); 
      }
    );
  }

  loginUser(data: any) {
    this.authService.authenticateUser(data).subscribe(
      result => {
        this.authService.setBearerToken(result['token']);
        this.authService.setUserId(data.userId);
      }
    );
  }

  cancel() {
    this.registerForm.reset();
    this.submitted=false;
  }

}
